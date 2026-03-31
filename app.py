from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import FileResponse
import json
import os

app = FastAPI()

# Простая раздача статики
@app.get("/")
async def root():
    return FileResponse("index.html")

@app.get("/{path:path}")
async def serve_static(path: str):
    file_path = path
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return FileResponse("index.html")

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("WebSocket клиент подключился")
    try:
        while True:
            data = await websocket.receive_text()
            print(f"Получено: {data}")

            if data.startswith("Vol:"):
                await websocket.send_json({"Vol": -21})
            elif data == "get_state":
                await websocket.send_json({"Vol": -21, "Mute": 1})
            else:
                await websocket.send_json({"status": "ok"})
    except WebSocketDisconnect:
        print("Клиент отключился")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)