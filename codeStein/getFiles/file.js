"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilesWithChanges = getFilesWithChanges;
function getFilesWithChanges(files) {
    const filesWithChanges = {};
    for (const fileChange of files) {
        if (fileChange.diff.trim() !== "") {
            filesWithChanges[fileChange.file] = fileChange.currentContent;
        }
    }
    return filesWithChanges;
}
//# sourceMappingURL=file.js.map