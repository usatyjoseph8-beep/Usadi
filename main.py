from fastapi import FastAPI, Response, Body
from prometheus_client import generate_latest, CONTENT_TYPE_LATEST

app = FastAPI(title="USADI Backend")

@app.get("/health")
def health():
    return {"status":"ok"}

@app.get("/metrics")
def metrics():
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)

@app.post("/projection")
def projection(payload: dict = Body(...)):
    portfolio = payload.get("portfolio", [])
    total_positions = sum(p.get("position",0)*p.get("price",0) for p in portfolio if p.get("type")=="EQUITY")
    return {"projection": {"mean_pnl": total_positions*0.001, "p5_pnl": -abs(total_positions*0.01),
                           "p95_pnl": abs(total_positions*0.02), "prob_positive": 0.6}}

@app.post("/daily_playbook")
def daily_playbook(payload: dict = Body(...)):
    proj = projection(payload)["projection"]
    portfolio = payload.get("portfolio", [])
    events = [{"time":"market_open","action":f"Consider covered call on {a.get('symbol','TICKER')}"} for a in portfolio if a.get("type")=="EQUITY"]
    narrative = f"Expected mean P/L ${proj['mean_pnl']:.2f} with P(>0)={proj['prob_positive']:.2f}. "
    if events:
        narrative += f"Top action: {events[0]['action']}."
    else:
        narrative += "Top action: Monitor markets."
    return {"projection": proj, "events": events, "narrative": narrative}
