Can a developer connect a local project, make a code change, and get a useful AI review before pushing to GitHub?
                 
                 
            YOUR WEB APP
        ┌─────────────────────────┐
        │ Dashboard               │
        │                         │
        │  My Projects            │
        │                         │
        │  ● my-store             │
        │    3 issues             │
        │                         │
        │  Recent Reviews         │
        │  login.ts — 2 issues    │
        └────────────┬────────────┘
                     │
                     │
              REST / WebSocket
                     │
                     ▼
        ┌─────────────────────────┐
        │      YOUR BACKEND       │
        │                         │
        │ Auth                    │
        │ Projects                │
        │ Reviews                 │
        │ AI Review Service       │
        └────────────┬────────────┘
                     │
                     │
              VS Code Extension
                     │
                     ▼
              📁 Local Project

1. User signs up
       ↓
2. User installs VS Code extension
       ↓
3. User connects project
       ↓
4. User writes code
       ↓
5. User clicks "Review Changes"
       ↓
6. Extension gets git diff
       ↓
7. Backend analyzes it
       ↓
8. AI produces findings
       ↓
9. Findings appear in VS Code
       ↓
10. Findings appear on website

Git diff
   ↓
Context extraction
   ↓
Prompt
   ↓
LLM
   ↓
Structured JSON
   ↓
Validate response
   ↓
Display findings
