import { CreateRequest } from "../backend/types";

export function validateCreateRequest(
    request: unknown
): CreateRequest {
    if (!request || typeof request !== "object") {
        throw new Error("Request must be an object.");
    }

    const value = request as Record<string, unknown>;

    if (value.action !== "create") {
        throw new Error("Invalid action.");
    }

    if (value.type !== "file" && value.type !== "folder") {
        throw new Error("Type must be 'file' or 'folder'.");
    }

    if (
        typeof value.path !== "string" ||
        value.path.trim().length === 0
    ) {
        throw new Error("Path is required.");
    }

    if (
        typeof value.name !== "string" ||
        value.name.trim().length === 0
    ) {
        throw new Error("Name is required.");
    }

    if (
        value.content !== undefined &&
        typeof value.content !== "string"
    ) {
        throw new Error("Content must be a string.");
    }

    return {
        action: "create",
        type: value.type,
        path: value.path,
        name: value.name,
        content: value.content as string | undefined
    };
}