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
- Location: Project root directory .task-tracker/tasks.json
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

## Approach
- Use a JSON file to store tasks.
- Each task has a unique ID, description, status (todo, in-progress, done),
- Use classes and interfaces to structure the code.

## Future Enhancements
- Add due dates to tasks.
- Improve error handling and validation.
