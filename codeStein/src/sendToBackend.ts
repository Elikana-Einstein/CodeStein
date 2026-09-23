import { FolderStructure } from "./getFolderStructure";

export async function sendToBackend(folderPath: string) {
    const response = await fetch("http://localhost:8000/file-creator/workspace", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            path: folderPath
        })
    });

    if (!response.ok) {
        throw new Error(
            `Backend returned ${response.status}: ${response.statusText}`
        );
    }

    return await response.json();
}

export async function sendFolderStructureToBackend(folderStructure: FolderStructure) {
    const response = await fetch("http://localhost:8000/file-creator/folder-structure", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            structure: folderStructure
        })
    });

    if (!response.ok) {
        throw new Error(
            `Backend returned ${response.status}: ${response.statusText}`
        );
    }

    return await response.json();
}
