import { handleFileRequests } from "./createFile";
import { output } from "./utils";

let socket: WebSocket | undefined;
function handleFileRequest(data: any) {
   
    handleFileRequests(data.requests);
}

export function connectToBackend() {
    socket = new WebSocket(
        "ws://127.0.0.1:8000/file-creator/ws"
    );

    socket.onopen = () => {
        output.appendLine("CodeStein: WebSocket connected");
    };

    socket.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);

            output.appendLine(
                `CodeStein: Received from backend: ${data}`,
                
            );

            if (data.type === "file_request") {
                handleFileRequest(data);
            }
        } catch (error) {
            output.appendLine(
                `CodeStein: Invalid WebSocket message ${error}`
            );
        }
    };

    socket.onerror = (error) => {
         output.appendLine(
                `CodeStein:  WebSocket error ${error}`
            );
    };

    socket.onclose = () => {
        output.appendLine(
            "CodeStein: WebSocket disconnected"
        );
    };
}