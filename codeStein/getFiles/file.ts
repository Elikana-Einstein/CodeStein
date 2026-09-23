interface FileChange {
  file: string;
  currentContent: string;
  diff: string;
}

export function getFilesWithChanges(files: FileChange[]): { [fileName: string]: string } {
    const filesWithChanges: { [fileName: string]: string } = {};
    for (const fileChange of files) {
        if (fileChange.diff.trim() !== "") {
            filesWithChanges[fileChange.file] = fileChange.currentContent;
        }
    }
    return filesWithChanges;
}
