from aiokafka import AIOKafkaProducer, AIOKafkaConsumer
import json
import logging
import asyncio
from typing import Optional, Dict, Any

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class KafkaConnection:
    def __init__(self, bootstrap_servers='localhost:9092'):
        self.bootstrap_servers = bootstrap_servers
        self.producer = None
        self.consumer = None
        self._producer_started = False
        self._consumer_started = False
    
    async def create_producer(self):
        """Create and start async Kafka producer"""
        try:
            if not self.producer:
                self.producer = AIOKafkaProducer(
                    bootstrap_servers=self.bootstrap_servers,
                    value_serializer=lambda v: json.dumps(v).encode('utf-8'),
                    key_serializer=lambda k: str(k).encode('utf-8') if k else None
                )
            
            if not self._producer_started:
                await self.producer.start()
                self._producer_started = True
                logger.info("Kafka producer created and started successfully")
            
            return self.producer
        except Exception as e:
            logger.error(f"Failed to create producer: {e}")
            return None
    
    async def create_consumer(self, topic, group_id='default-group'):
        """Create and start async Kafka consumer"""
        try:
            if not self.consumer:
                self.consumer = AIOKafkaConsumer(
                    topic,
                    bootstrap_servers=self.bootstrap_servers,
                    group_id=group_id,
                    value_deserializer=lambda m: json.loads(m.decode('utf-8')) if m else None,
                    auto_offset_reset='earliest'
                )
            
            if not self._consumer_started:
                await self.consumer.start()
                self._consumer_started = True
                logger.info(f"Kafka consumer created and started for topic: {topic}")
            
            return self.consumer
        except Exception as e:
            logger.error(f"Failed to create consumer: {e}")
            return None
    
    async def send_message(self, topic, message, key=None):
        """Send message to Kafka topic"""
        if not self.producer or not self._producer_started:
            await self.create_producer()
        
        try:
            await self.producer.send_and_wait(topic, value=message, key=key)
            logger.info(f"Message sent to topic {topic}")
            return True
        except Exception as e:
            logger.error(f"Failed to send message: {e}")
            return False
    
    async def close_connections(self):
        """Close producer and consumer connections"""
        try:
            if self.producer and self._producer_started:
                await self.producer.stop()
                self._producer_started = False
                logger.info("Kafka producer stopped")
            
            if self.consumer and self._consumer_started:
                await self.consumer.stop()
                self._consumer_started = False
                logger.info("Kafka consumer stopped")
                
            logger.info("Kafka connections closed")
        except Exception as e:
            logger.error(f"Error closing Kafka connections: {e}")

# Global Kafka connection instance
kafka_connection = None

async def get_kafka_connection():
    """Get or create global Kafka connection"""
    global kafka_connection
    if kafka_connection is None:
        kafka_connection = KafkaConnection()
        await kafka_connection.create_producer()
    return kafka_connection

async def send_kafka_message(topic: str, message: Dict[str, Any], key: Optional[str] = None):
    """Utility function to send Kafka message"""
    try:
        kafka_conn = await get_kafka_connection()
        return await kafka_conn.send_message(topic, message, key)
    except Exception as e:
        logger.error(f"Error sending Kafka message: {e}")
        return False

# Example usage
if __name__ == "__main__":
    kafka_conn = KafkaConnection()
    
    # Send a test message
    producer = kafka_conn.create_producer()
    if producer:
        kafka_conn.send_message('test-topic', {'message': 'Hello Kafka!'})
    
    kafka_conn.close_connections()