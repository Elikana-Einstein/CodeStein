import { handleFileRequests } from "./createFile";
import { output } from "./utils";
import * as path from "path";
import * as vscode from "vscode";

let socket: WebSocket | undefined;
function handleFileRequest(data: any) {
    handleFileRequests(data.requests);
}

async function handleCodeRequest(data: { path: string }) {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        output.appendLine("CodeStein: Cannot read code without an open workspace.");
        return;
    }

    const requestedPath = data.path.replace(/\\/g, "/").split("/");
    if (requestedPath[0] === path.basename(workspaceFolder.uri.fsPath)) {
        requestedPath.shift();
    }

    const fileUri = vscode.Uri.joinPath(workspaceFolder.uri, ...requestedPath);
    try {
        const bytes = await vscode.workspace.fs.readFile(fileUri);
        const code = new TextDecoder().decode(bytes);
        const response = await fetch("http://localhost:8000/file-creator/get_code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path: data.path, code }),
        });

        if (!response.ok) {
            throw new Error(`Backend returned ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        output.appendLine(`CodeStein: Failed to send requested code: ${error}`);
    }
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
            }else if(data.type === "code_request"){
                void handleCodeRequest(data);
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