class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []
        self.frontend_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket, frontend: bool = False):
        await websocket.accept()
        self.active_connections.append(websocket)
        if frontend:
            self.frontend_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
        if websocket in self.frontend_connections:
            self.frontend_connections.remove(websocket)

    async def _broadcast(self, connections: list[WebSocket], message: dict):
        disconnected = []

        for connection in connections:
            try:
                await connection.send_json(message)
            except Exception:
                disconnected.append(connection)

        for connection in disconnected:
            self.disconnect(connection)

    async def broadcast(self, message: dict):
        await self._broadcast(self.active_connections, message)

    async def broadcast_frontend(self, message: dict):
        await self._broadcast(self.frontend_connections, message)

    async def broadcast_extension(self, message: dict):
        extension_connections = [
            connection
            for connection in self.active_connections
            if connection not in self.frontend_connections
        ]
        await self._broadcast(extension_connections, message)


manager = ConnectionManager()