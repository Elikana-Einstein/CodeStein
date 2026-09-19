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
exports.BackendClient = void 0;
//@ts-ignore
const vscode = __importStar(require("vscode"));
const requestValidator_1 = require("../validation/requestValidator");
const createCommand_1 = require("../commands/createCommand");
const logger_1 = require("../utils/logger");
class BackendClient {
    backendUrl;
    workspacePublished = false;
    constructor() {
        const config = vscode.workspace.getConfiguration("fileCreator");
        this.backendUrl =
            config.get("backendUrl") ?? "http://localhost:8000";
    }
    async fetchRequests() {
        try {
            await this.publishWorkspace();
            const response = await fetch(`${this.backendUrl}/file-creator/requests`);
            if (!response.ok) {
                throw new Error(`Backend returned HTTP ${response.status}`);
            }
            const data = await response.json();
            if (!Array.isArray(data)) {
                throw new Error("Backend response must be an array.");
            }
            for (const item of data) {
                await this.processRequest(item);
            }
        }
        catch (error) {
            const message = error instanceof Error
                ? error.message
                : String(error);
            (0, logger_1.log)(`Backend request failed: ${message}`);
        }
    }
    async publishWorkspace() {
        if (this.workspacePublished) {
            return;
        }
        const workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!workspacePath) {
            return;
        }
        const response = await fetch(`${this.backendUrl}/file-creator/workspace`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ path: workspacePath })
        });
        if (!response.ok) {
            throw new Error(`Backend returned HTTP ${response.status}`);
        }
        this.workspacePublished = true;
    }
    async processRequest(data) {
        try {
            const request = (0, requestValidator_1.validateCreateRequest)(data);
            await (0, createCommand_1.executeCreateRequest)(request);
            (0, logger_1.log)(`Processed backend request: ${JSON.stringify(request)}`);
        }
        catch (error) {
            const message = error instanceof Error
                ? error.message
                : String(error);
            (0, logger_1.log)(`Invalid backend request: ${message}`);
        }
    }
}
exports.BackendClient = BackendClient;
//# sourceMappingURL=client.js.map