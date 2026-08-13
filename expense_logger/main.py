import os
import logging
import asyncio
import jwt  # PyJWT
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, status, Depends
from dependencies.auth import get_current_user
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.encoders import jsonable_encoder
import uvicorn

# Imports from your modules
from config.kafka import get_kafka_connection, kafka_connection
from config.consumer import start_consumer
from routes.log_routes import router as log_router

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- LIFESPAN CONTEXT MANAGER ---

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🚀 Starting up the FastAPI application...")
    logger.info("🔌 Connecting to Kafka Producer...")
    await get_kafka_connection()
    logger.info("✅ Kafka connection established")

    consumer_task = asyncio.create_task(start_consumer())

    yield

    logger.info("🛑 Shutting down application...")
    consumer_task.cancel()
    try:
        await consumer_task
    except asyncio.CancelledError:
        logger.info("✅ Consumer background task safely stopped")

    if kafka_connection:
        logger.info("🔌 Closing global Kafka producer...")
        await kafka_connection.close_connections()
        logger.info("✅ Global Kafka connection closed")


# --- FASTAPI APP INITIALIZATION ---

app = FastAPI(
    title="Fast API Expense Logger Microservice",
    docs_url="/docs",
    version="0.0.1",
    lifespan=lifespan,
)

origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- EXCEPTION HANDLER ---

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder({"detail": exc.errors(), "body": exc.body}),
    )


app.include_router(log_router)


# --- ROUTES ---

@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI Expense Logger Microservice App!"}


# Example protected route:
@app.get("/api/me")
async def read_current_user_details(current_user: dict = Depends(get_current_user)):
    # current_user will be {'id': '<user_id>'} extracted from the Express JWT
    return {
        "status": "authenticated",
        "user_id": current_user.get("id"),
        "username": current_user.get("username", "N/A"),
        "email": current_user.get("email", "N/A"),
    }


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)