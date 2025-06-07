import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Skeleton,
  MenuItem,
} from "@mui/material";

const StripeStylePaymentPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Paper elevation={3} sx={{ display: "flex", p: 4, borderRadius: 3 }}>
          <Box flex={1} mr={4}>
            <Skeleton variant="text" width={150} height={30} />
            <Skeleton variant="text" width={100} height={40} />
            <Skeleton variant="rectangular" height={150} sx={{ mt: 3 }} />
          </Box>
          <Box flex={1}>
            {[...Array(7)].map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height={50}
                sx={{ mb: 2 }}
              />
            ))}
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ display: "flex", p: 4, borderRadius: 3 }}>
        {/* Left: Product Info */}
        <Box flex={1} pr={4} borderRight="1px solid #eee">
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Subscribe to Togethere Professional
          </Typography>
          <Typography
            variant="h4"
            color="primary"
            fontWeight={700}
            gutterBottom
          >
            $5.00
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Per month
          </Typography>

          <Box
            component="img"
            src="https://img.freepik.com/free-vector/hands-holding-credit-card-mobile-phone-with-banking-app-person-paying-with-bank-card-transferring-money-shopping-online-flat-vector-illustration-payment-finance-concept_74855-24760.jpg?t=st=1744975865~exp=1744979465~hmac=163eb576a80c0a91e9c8b2ebd5a9bb8ff44aa1bedea1d24b0b66b619cc8f480d&w=740"
            alt="Subscription"
            sx={{ width: "100%", maxWidth: 250, mt: 4 }}
          />
        </Box>

        {/* Right: Payment Form */}
        <Box flex={1} pl={4}>
          <Button
            fullWidth
            variant="contained"
            // startIcon={<AppleIcon />}
            sx={{
              mb: 2,
              backgroundColor: "black",
              "&:hover": { backgroundColor: "#333" },
              textTransform: "none",
            }}
          >
            Pay
          </Button>

          <Typography variant="body2" textAlign="center" mb={2}>
            Or pay another way
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="Email" fullWidth />
            <TextField
              label="Card Number"
              placeholder="1234 1234 1234 1234"
              fullWidth
            />
            <Box display="flex" gap={2}>
              <TextField label="MM / YY" placeholder="MM / YY" fullWidth />
              <TextField label="CVC" placeholder="CVC" fullWidth />
            </Box>
            <TextField label="Name on card" fullWidth />
            <TextField
              label="Country"
              select
              defaultValue="United States"
              fullWidth
            >
              <MenuItem value="United States">United States</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
              <MenuItem value="United Kingdom">United Kingdom</MenuItem>
            </TextField>
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, textTransform: "none", fontWeight: 600 }}
          >
            Subscribe
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default StripeStylePaymentPage;
