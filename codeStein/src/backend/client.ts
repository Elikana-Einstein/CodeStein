//@ts-ignore
import * as vscode from "vscode";

import { CreateRequest } from "./types";
import { validateCreateRequest } from "../validation/requestValidator";
import { executeCreateRequest } from "../commands/createCommand";
import { log } from "../utils/logger";

export class BackendClient {
    private readonly backendUrl: string;
    private workspacePublished = false;

    constructor() {
        const config =
            vscode.workspace.getConfiguration(
                "fileCreator"
            );

        this.backendUrl =
            config.get<string>(
                "backendUrl"
            ) ?? "http://localhost:8000";
    }

    async fetchRequests(): Promise<void> {
        try {
            await this.publishWorkspace();

            const response = await fetch(
                `${this.backendUrl}/file-creator/requests`
            );

            if (!response.ok) {
                throw new Error(
                    `Backend returned HTTP ${response.status}`
                );
            }

            const data: unknown =
                await response.json();

            if (!Array.isArray(data)) {
                throw new Error(
                    "Backend response must be an array."
                );
            }

            for (const item of data) {
                await this.processRequest(item);
            }
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : String(error);

            log(
                `Backend request failed: ${message}`
            );
        }
    }

    private async publishWorkspace(): Promise<void> {
        if (this.workspacePublished) {
            return;
        }

        const workspacePath =
            vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

        if (!workspacePath) {
            return;
        }

        const response = await fetch(
            `${this.backendUrl}/file-creator/workspace`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ path: workspacePath })
            }
        );

        if (!response.ok) {
            throw new Error(
                `Backend returned HTTP ${response.status}`
            );
        }

        this.workspacePublished = true;
    }

    private async processRequest(
        data: unknown
    ): Promise<void> {
        try {
            const request =
                validateCreateRequest(data);

            await executeCreateRequest(request);

            log(
                `Processed backend request: ${JSON.stringify(
                    request
                )}`
            );
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : String(error);

            log(
                `Invalid backend request: ${message}`
            );
        }
    }
}