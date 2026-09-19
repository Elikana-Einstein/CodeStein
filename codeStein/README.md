src/
│
├── extension.ts
│
├── commands/
│   └── reviewChanges.ts
│
├── git/
│   ├── gitService.ts
│   ├── repository.ts
│   └── diffService.ts
│
├── review/
│   ├── reviewService.ts
│   ├── reviewTypes.ts
│   └── reviewPoller.ts
│
├── api/
│   └── backendClient.ts
│
├── ui/
│   ├── reviewPanel.ts
│   ├── reviewStatus.ts
│   └── diagnostics.ts
│
└── auth/
    └── authService.ts

# VS Code File Creator

A VS Code extension that receives file and folder creation requests
from a backend and creates them inside the currently opened workspace.

## Features

- Create files
- Create folders
- Create nested folders automatically
- Optional file content
- Backend integration
- Workspace path validation
- Prevents paths outside the workspace

## Development

Install dependencies:

```bash
npm install