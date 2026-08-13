import asyncio
import logging
from config.kafka import KafkaConnection
from config.db import SessionLocal
from models.log_model import ExpenseLog

logger = logging.getLogger(__name__)

def log_expense_event(event_data: dict, db):
    """Parses event payload and saves it into PostgreSQL via SQLAlchemy."""
    user_id = event_data.get("user_id")
    amount = event_data.get("amount", 0.0)
    action_type = event_data.get("type", "EXPENSE_CREATED")
    description = event_data.get("description", "")
    created_at_str = event_data.get("createdAt")

    event_title = event_data.get("title") or f"Expense Action: {action_type}"
    detail = f"Amount: ₹{amount} | Details: {description}"
    if created_at_str:
        detail += f" | Event Time: {created_at_str}"

    log_entry = ExpenseLog(
        title=event_title,
        description=detail,
        type=action_type,
        user_id=user_id
    )

    db.add(log_entry)
    db.commit()
    db.refresh(log_entry)
    logger.info(f"✅ Logged expense event for user {user_id}: {event_title}")

async def start_consumer():
    kafka_conn = KafkaConnection(bootstrap_servers='localhost:9092')
    
    # 1. Initialize and start the aiokafka consumer instance
    consumer = await kafka_conn.create_consumer(
        topic='expense-topic', 
        group_id='expense-logger-group'
    )
    
    if not consumer:
        logger.error("❌ Failed to start consumer. Exiting.")
        return

    logger.info("🚀 Async Kafka Consumer listening on 'expense-topic'...")

    try:
        # 2. Use 'async for' to consume messages from aiokafka
        async for message in consumer:
            payload = message.value
            logger.info(f"📩 Received Message: {payload}")

            # 3. Open a fresh DB session per message
            with SessionLocal() as db:
                try:
                    log_expense_event(payload, db)
                except Exception as db_err:
                    db.rollback()
                    logger.error(f"❌ Failed to save log to DB: {db_err}")

    except asyncio.CancelledError:
        logger.info("Consumer loop cancelled.")
    except Exception as e:
        logger.error(f"❌ Consumer Error: {e}")
    finally:
        # 4. Clean up connections on exit
        await kafka_conn.close_connections()

if __name__ == "__main__":
    # Run the async loop
    try:
        asyncio.run(start_consumer())
    except KeyboardInterrupt:
        print("\nStopping consumer process...")