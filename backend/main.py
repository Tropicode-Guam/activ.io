from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from bson import ObjectId


load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

app = FastAPI()

client = AsyncIOMotorClient(DATABASE_URL)
database = client.tropicodeDB
collection = database["users"]

@app.get("/")
async def root():
    user = await collection.find_one()
    if user:
        user["_id"] = str(user["_id"])  # Convert ObjectId to string
    return {"user": user}
