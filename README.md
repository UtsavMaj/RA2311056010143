# Notification Priority Dashboard

This project is a React-based "Priority Inbox" designed to fetch, rank, and display notifications based on specific importance levels.

## 🧠 Priority Logic
Notifications are categorized and ranked using a weighted system to ensure critical updates are seen first:
- **Placement (Weight 3)**: Highest Priority
- **Result (Weight 2)**: Medium Priority
- **Event (Weight 1)**: Standard Priority

**Tie-breaking**: If multiple notifications share the same priority weight, they are sorted in descending order by their timestamp (newest first).

## 🛠️ Features & Tech Stack
- **Frontend**: React.js with Material UI (MUI) for a clean, responsive layout.
- **Authentication**: Secure integration via JWT Bearer tokens.
- **Logic Verification**: Ranking algorithm verified via Node.js scripts prior to UI integration.

## 🚀 How to Run Locally
1. Clone the repository.
2. Navigate to the `notification_app_fe` directory.
3. Install dependencies: `npm install`.
4. Start the application: `npm start`.
