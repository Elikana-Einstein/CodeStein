//@ts-ignore
import * as vscode from "vscode";

import { BackendClient } from "./backend/client";
import { registerCreateCommand } from "./commands/createCommand";
import {
    initializeLogger,
    log
} from "./utils/logger";

export function activate(
    context: vscode.ExtensionContext
): void {
    initializeLogger();

    log("File Creator extension activated.");

    registerCreateCommand(context);

    const backendClient =
        new BackendClient();

    /*
     * For the MVP, poll the backend every 2 seconds.
     *
     * We can replace this with WebSocket later.
     */
    const timer = setInterval(
        async () => {
            await backendClient.fetchRequests();
        },
        2000
    );

    context.subscriptions.push({
        dispose: () => {
            clearInterval(timer);
        }
    });
}

export function deactivate(): void {
    // Cleanup happens through subscriptions.
}