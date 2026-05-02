import React, { useEffect, useState } from 'react';
import { Container, Typography, Stack, Card, CardContent, Chip, Box, CircularProgress } from '@mui/material';

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ1bTA4MTJAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNDk0NiwiaWF0IjoxNzc3NzA0MDQ2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNzM3YzE3NTctOWUwMS00ZWUxLTg5MDYtZDBhMzVhZWYzMmY3IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidXRzYXYgbWFqdW1kYXIiLCJzdWIiOiJhNDExMDM5My0zYmZmLTQ5ZjAtOGZjMC0zNTIyYjJmNmUxNGEifSwiZW1haWwiOiJ1bTA4MTJAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJ1dHNhdiBtYWp1bWRhciIsInJvbGxObyI6InJhMjMxMTA1NjAxMDE0MyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImE0MTEwMzkzLTNiZmYtNDlmMC04ZmMwLTM1MjJiMmY2ZTE0YSIsImNsaWVudFNlY3JldCI6InFEd05mclVtRmN2RnpBcXYifQ.21vzl_D1s9X3nAJDPpLkEt7GEKpnPP2p7B887Iy5Vfg";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('http://20.207.122.201/evaluation-service/notifications', {
          headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` }
        });
        
        const result = await res.json();
        
        const rawData = Array.isArray(result) ? result : (result.data || result.notifications || []);
        
        // Ranking Logic: Placement (3) > Result (2) > Event (1)
        const weights = { placement: 3, result: 2, event: 1 };
        
        const sorted = [...rawData].sort((a, b) => {
          const wA = weights[a.Type?.toLowerCase()] || 0;
          const wB = weights[b.Type?.toLowerCase()] || 0;
          
          // Primary Sort: Weight
          if (wB !== wA) return wB - wA;
          
          // Secondary Sort: Recency (Timestamp)
          return new Date(b.Timestamp) - new Date(a.Timestamp);
        }).slice(0, 10);

        setNotifications(sorted);
        setLoading(false);
      } catch (err) {
        console.error("Fetch failed:", err);
        setLoading(false);
      }
    };
    
    fetchItems();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}>
        Priority Inbox
      </Typography>
      
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={2}>
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <Card key={n.ID} elevation={3} sx={{ borderRadius: '12px' }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" mb={1} alignItems="center">
                    <Chip 
                      label={n.Type} 
                      color={n.Type === 'Placement' ? 'primary' : 'secondary'} 
                      size="small" 
                    />
                    <Typography variant="caption" color="text.secondary">
                      {n.Timestamp}
                    </Typography>
                  </Box>
                  <Typography variant="body1" fontWeight="500">
                    {n.Message}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography align="center" color="text.secondary">
              No notifications found. Please check your token or CORS extension.
            </Typography>
          )}
        </Stack>
      )}
    </Container>
  );
}

export default App;