python -m venv .\.venv
.\.venv\Scripts\pip.exe install -r backend\app\requirements.txt
.\.venv\Scripts\uvicorn.exe app.main:app --host 0.0.0.0 --port 8000 --reload --app-dir backend
