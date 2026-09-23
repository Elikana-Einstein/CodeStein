let socket = null;
let connectionPromise = null;
const messageListeners = new Set();

function handleMessage(event) {
  try {
    const message = JSON.parse(event.data);
    messageListeners.forEach((listener) => listener(message));
  } catch (error) {
    console.error("Invalid WebSocket message:", error);
  }
}

export function connectWebSocket() {
  if (socket?.readyState === WebSocket.OPEN) {
    return Promise.resolve(socket);
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = new Promise((resolve, reject) => {
    socket = new WebSocket("ws://127.0.0.1:8000/file-creator/ws/frontend");
    socket.onmessage = handleMessage;

    socket.onopen = () => {
      console.log("WebSocket connected");
      connectionPromise = null;
      resolve(socket);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      connectionPromise = null;
      reject(error);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      socket = null;
    };
  });

  return connectionPromise;
}

export async function sendWebSocketMessage(message) {
  const ws = await connectWebSocket();

  ws.send(JSON.stringify(message));
}

export async function subscribeWebSocketMessage(listener) {
  await connectWebSocket();
  messageListeners.add(listener);

  return () => {
    messageListeners.delete(listener);
  };
}

export function closeWebSocket() {
  if (socket) {
    socket.close();
    socket = null;
  }
}
