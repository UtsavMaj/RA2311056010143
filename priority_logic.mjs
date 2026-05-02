import { Log } from './logging_middleware/logger.js';

const API_URL = 'http://20.207.122.201/evaluation-service/notifications';
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ1bTA4MTJAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMDgwMSwiaWF0IjoxNzc3Njk5OTAxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYzhkMjFiMzUtZjBiZS00NTI3LTgxOTMtMjBjMTk1NmQyZDBhIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidXRzYXYgbWFqdW1kYXIiLCJzdWIiOiJhNDExMDM5My0zYmZmLTQ5ZjAtOGZjMC0zNTIyYjJmNmUxNGEifSwiZW1haWwiOiJ1bTA4MTJAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJ1dHNhdiBtYWp1bWRhciIsInJvbGxObyI6InJhMjMxMTA1NjAxMDE0MyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImE0MTEwMzkzLTNiZmYtNDlmMC04ZmMwLTM1MjJiMmY2ZTE0YSIsImNsaWVudFNlY3JldCI6InFEd05mclVtRmN2RnpBcXYifQ.KlSgdg6mk25beFgG0_i8W53DHW3bAK6QXNYEo-Rmg6w"; 

const weights = {
    'placement': 3,
    'result': 2,
    'event': 1
};

async function getPriorityNotifications() {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (result.message && !Array.isArray(result.data || result)) {
            throw new Error(result.message);
        }

        let notifications = Array.isArray(result) ? result : (result.data || result.notifications || []);

        const sorted = notifications.sort((a, b) => {
    const weightA = weights[a.Type?.toLowerCase()] || 0;
    const weightB = weights[b.Type?.toLowerCase()] || 0;

    if (weightB !== weightA) {
        return weightB - weightA;
    }

    return new Date(b.Timestamp) - new Date(a.Timestamp);
});

        const top10 = sorted.slice(0, 10);
        await Log("frontend", "info", "utils", `Successfully ranked top 10 notifications`);

        return top10;
    } catch (error) {
        console.error("DETAILED ERROR:", error.message);
        await Log("frontend", "error", "api", `Failed to fetch: ${error.message}`);
    }
}

getPriorityNotifications().then(data => {
    if (data && data.length > 0) {
        console.log("\n--- Top 10 Priority Notifications ---");
        console.table(data); 
    } else {
        console.log("\nFinal Status: No data could be processed. Check your token.");
    }
});