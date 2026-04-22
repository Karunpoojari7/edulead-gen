from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import joblib
import os
from datetime import datetime
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

app = FastAPI(title="EduLead ML Automation Service")

# Data Models
class LeadInput(BaseModel):
    lead_id: int
    source: str
    days_since_created: int
    interaction_count: int
    status: str

class PredictionOutput(BaseModel):
    score: int
    category: str
    action: str

# Mock Model & Encoders (In production, these would be loaded from joblib files)
# We'll use a simple rule-based engine that simulates ML for this demonstration
# but uses the structure requested.

def calculate_lead_score(data: LeadInput):
    score = 50 # Base score
    
    # Source weights
    source_weights = {
        "facebook": 10,
        "google": 15,
        "referral": 25,
        "direct": 5,
        "walk-in": 20
    }
    score += source_weights.get(data.source.lower(), 0)
    
    # Interaction count impact
    score += min(data.interaction_count * 10, 30)
    
    # Age impact (newer leads get slightly higher scores usually, but depends on logic)
    if data.days_since_created < 2:
        score += 10
    elif data.days_since_created > 7:
        score -= 15
        
    # Status impact
    if data.status == "NEW":
        score += 5
    elif data.status == "FOLLOW_UP":
        score += 10
        
    return max(0, min(100, score))

def determine_category(score: int):
    if score >= 80:
        return "HOT"
    elif score >= 50:
        return "WARM"
    else:
        return "COLD"

def recommend_action(score: int, category: str):
    if score > 80:
        return "CALL_NOW"
    elif score >= 50:
        return "SEND_EMAIL"
    else:
        return "WAIT"

@app.get("/")
def read_root():
    return {"message": "EduLead ML Automation Service is Operational", "status": "healthy"}

@app.post("/ml/predict", response_model=PredictionOutput)
async def predict(lead: LeadInput):
    try:
        # Simulate ML Processing
        score = calculate_lead_score(lead)
        category = determine_category(score)
        action = recommend_action(score, category)
        
        return PredictionOutput(
            score=score,
            category=category,
            action=action
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
