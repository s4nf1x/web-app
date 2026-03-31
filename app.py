from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import json
import os

app = FastAPI()

# Раздача статических файлов (HTML, CSS, JS)
app.mount("/web", StaticFiles(directory=".", html=True), name="web")

# Данные по умолчанию (можно читать из settings*.ini)
current_data = {
    "Vol": -21,
    "Mute": 1,
    "Time": "00:00:00"
}

@app.get("/")
async def root():
    return FileResponse("index.html")

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            print(f"Received: {data}")

            # Обработка команд (упрощённо)
            if data.startswith("Vol:"):
                current_data["Vol"] = int(data.split(":")[1])
                await websocket.send_json({"Vol": current_data["Vol"]})
            elif data == "get_state":
                await websocket.send_json(current_data)
            else:
                # Здесь можно парсить JSON из main.js
                pass
    except WebSocketDisconnect:
        print("Client disconnected")