export type CreateType = "file" | "folder";

export interface CreateRequest {
    action: "create";
    type: CreateType;

    /**
     * Workspace-relative directory where the item should be created.
     *
     * Example:
     * src/components
     */
    path: string;

    /**
     * File or folder name.
     *
     * Example:
     * Button.tsx
     */
    name: string;

    /**
     * Optional file content.
     * Ignored when type === "folder".
     */
    content?: string;
}

export interface CreateResponse {
    success: boolean;
    type: CreateType;
    path?: string;
    error?: string;
}