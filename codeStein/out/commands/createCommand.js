"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCreateRequest = executeCreateRequest;
exports.registerCreateCommand = registerCreateCommand;
//@ts-ignore
const vscode = __importStar(require("vscode"));
const fileCreator_1 = require("../filesystem/fileCreator");
const folderCreator_1 = require("../filesystem/folderCreator");
const pathResolver_1 = require("../filesystem/pathResolver");
const logger_1 = require("../utils/logger");
async function executeCreateRequest(request) {
    const uri = (0, pathResolver_1.resolveWorkspacePath)(request.path, request.name);
    if (request.type === "folder") {
        await (0, folderCreator_1.createFolder)(uri);
        (0, logger_1.log)(`Created folder: ${uri.fsPath}`);
        return;
    }
    await (0, fileCreator_1.createFile)(uri, request.content ?? "");
    (0, logger_1.log)(`Created file: ${uri.fsPath}`);
}
function registerCreateCommand(context) {
    const command = vscode.commands.registerCommand("vscode-file-creator.create", async () => {
        try {
            const type = await vscode.window.showQuickPick(["file", "folder"], {
                placeHolder: "What do you want to create?"
            });
            if (!type) {
                return;
            }
            const relativePath = await vscode.window.showInputBox({
                prompt: "Enter the directory path",
                placeHolder: "src/components"
            });
            if (relativePath === undefined) {
                return;
            }
            const name = await vscode.window.showInputBox({
                prompt: `Enter the ${type} name`,
                placeHolder: type === "file"
                    ? "Button.tsx"
                    : "components"
            });
            if (!name) {
                return;
            }
            let content;
            if (type === "file") {
                content =
                    await vscode.window.showInputBox({
                        prompt: "Enter file content (optional)"
                    });
            }
            await executeCreateRequest({
                action: "create",
                type: type,
                path: relativePath,
                name,
                content
            });
            vscode.window.showInformationMessage(`Created ${type}: ${name}`);
        }
        catch (error) {
            const message = error instanceof Error
                ? error.message
                : String(error);
            (0, logger_1.log)(`Error: ${message}`);
            vscode.window.showErrorMessage(`File Creator: ${message}`);
        }
    });
    context.subscriptions.push(command);
}
//# sourceMappingURL=createCommand.js.map