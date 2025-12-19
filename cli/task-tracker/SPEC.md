# Task Tracker CLI Specification

## Commands
- add <description>
- list
- update <id> <description>
- delete <id>
- mark-in-progress <id>
- mark-done <id>

## Storage
- File: task-tracker.json
- Location: OS-specific config directory
- Format:
```json
{
  "tasks": [
    {
      "id": 1,
      "description": "Buy milk",
      "status": "todo",
      "createdAt": "ISO-8601",
      "updatedAt": "ISO-8601"
    }
  ]
}
