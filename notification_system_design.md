Implementation of Ranking Logic Algorithm – Stage 1

    Priority Weighting: Created a weighted priority ranking algorithm to classify the notifications by their importance: Placement (Weight 3), Result (Weight 2), and Event (Weight 1).
    Chronological Ordering: Implemented an additional sorting criterion by leveraging the Timestamp field to sort notifications with equal priority weights in descending chronological order.
    Verification: Performed logic verification in Node.js (priority_logic.mjs) and ensured that only the top 10 notifications by rank are retrieved efficiently.
    
Implementation of Frontend & API – Stage 2

    Responsive Design: Created the Priority Inbox using React and Material UI with Stack and Card components.
    Notification Categorization: Added dynamic Material UI Chip elements to visually categorize the notifications based on their types, e.g., Primary (Blue) for Placements.
    Data Validation: Included the data validation layer in the frontend to support multiple formats returned from the API and prevent potential errors with the sort() method.
    API Integration: Succeeded in integrating the frontend with the evaluation service and accessing it through the provided JWT Bearer Token.
    Environment Setup: Efficiently circumvented the server-side CORS settings during the development phase using browser-based bypass methods.