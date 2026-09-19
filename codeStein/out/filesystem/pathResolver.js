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
exports.resolveWorkspacePath = resolveWorkspacePath;
//@ts-ignore
const path = __importStar(require("path"));
//@ts-ignore
const vscode = __importStar(require("vscode"));
function resolveWorkspacePath(relativePath, name) {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        throw new Error("No VS Code workspace is currently open.");
    }
    const workspaceRoot = path.resolve(workspaceFolder.uri.fsPath);
    const requestedDirectory = path.isAbsolute(relativePath)
        ? path.resolve(relativePath)
        : path.resolve(workspaceRoot, relativePath);
    const requestedPath = path.resolve(requestedDirectory, name);
    const relativeToWorkspace = path.relative(workspaceRoot, requestedPath);
    if (relativeToWorkspace.startsWith("..") ||
        path.isAbsolute(relativeToWorkspace)) {
        throw new Error("The requested path is outside the workspace.");
    }
    return vscode.Uri.file(requestedPath);
}
//# sourceMappingURL=pathResolver.js.map