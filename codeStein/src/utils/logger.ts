//@ts-ignore
import * as vscode from "vscode";

let outputChannel: vscode.OutputChannel | undefined;

export function initializeLogger(): void {
    outputChannel = vscode.window.createOutputChannel(
        "File Creator"
    );
}

export function log(message: string): void {
    outputChannel?.appendLine(
        `[${new Date().toISOString()}] ${message}`
    );
}

export function showLogs(): void {
    outputChannel?.show();
}