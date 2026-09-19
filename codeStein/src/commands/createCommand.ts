//@ts-ignore
import * as vscode from "vscode";

import { createFile } from "../filesystem/fileCreator";
import { createFolder } from "../filesystem/folderCreator";
import { resolveWorkspacePath } from "../filesystem/pathResolver";
import { CreateRequest } from "../backend/types";
import { log } from "../utils/logger";

export async function executeCreateRequest(
    request: CreateRequest
): Promise<void> {
    const uri = resolveWorkspacePath(
        request.path,
        request.name
    );

    if (request.type === "folder") {
        await createFolder(uri);

        log(`Created folder: ${uri.fsPath}`);

        return;
    }

    await createFile(
        uri,
        request.content ?? ""
    );

    log(`Created file: ${uri.fsPath}`);
}

export function registerCreateCommand(
    context: vscode.ExtensionContext
): void {
    const command = vscode.commands.registerCommand(
        "vscode-file-creator.create",
        async () => {
            try {
                const type = await vscode.window.showQuickPick(
                    ["file", "folder"],
                    {
                        placeHolder: "What do you want to create?"
                    }
                );

                if (!type) {
                    return;
                }

                const relativePath =
                    await vscode.window.showInputBox({
                        prompt: "Enter the directory path",
                        placeHolder: "src/components"
                    });

                if (relativePath === undefined) {
                    return;
                }

                const name =
                    await vscode.window.showInputBox({
                        prompt: `Enter the ${type} name`,
                        placeHolder:
                            type === "file"
                                ? "Button.tsx"
                                : "components"
                    });

                if (!name) {
                    return;
                }

                let content: string | undefined;

                if (type === "file") {
                    content =
                        await vscode.window.showInputBox({
                            prompt:
                                "Enter file content (optional)"
                        });
                }

                await executeCreateRequest({
                    action: "create",
                    type: type as "file" | "folder",
                    path: relativePath,
                    name,
                    content
                });

                vscode.window.showInformationMessage(
                    `Created ${type}: ${name}`
                );
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : String(error);

                log(`Error: ${message}`);

                vscode.window.showErrorMessage(
                    `File Creator: ${message}`
                );
            }
        }
    );

    context.subscriptions.push(command);
}