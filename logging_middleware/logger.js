const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ1bTA4MTJAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzY5OTI5MywiaWF0IjoxNzc3Njk4MzkzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMTk2MjUwMDgtYzA0MC00NjQ0LTg5ZDgtYjU0ZWJiNTgwMWM4IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidXRzYXYgbWFqdW1kYXIiLCJzdWIiOiJhNDExMDM5My0zYmZmLTQ5ZjAtOGZjMC0zNTIyYjJmNmUxNGEifSwiZW1haWwiOiJ1bTA4MTJAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJ1dHNhdiBtYWp1bWRhciIsInJvbGxObyI6InJhMjMxMTA1NjAxMDE0MyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImE0MTEwMzkzLTNiZmYtNDlmMC04ZmMwLTM1MjJiMmY2ZTE0YSIsImNsaWVudFNlY3JldCI6InFEd05mclVtRmN2RnpBcXYifQ.ww4opMfV3_n6rfw5XHg5quvqoJbLzkGUUt3mjkClXPg"; 

/**
 * Mandatory Logging function
 * @param {string} stack - 'frontend' or 'backend'
 * @param {string} level - 'debug', 'info', 'warn', 'error', 'fatal'
 * @param {string} package_name - e.g., 'component', 'api', 'state'
 * @param {string} message - Descriptive message
 */
export const Log = async (stack, level, package_name, message) => {
    const logData = {
        stack: stack.toLowerCase(),
        level: level.toLowerCase(),
        package: package_name.toLowerCase(),
        message: message
    };

    try {
        await fetch('http://20.207.122.201/evaluation-service/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            },
            body: JSON.stringify(logData)
        });
    } catch (err) {
        // Silently fail as console.log is banned
    }
};