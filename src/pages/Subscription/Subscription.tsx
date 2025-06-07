import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
} from '@mui/material';
import { AccessTime, CheckCircle } from '@mui/icons-material';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchSubscriptions } from '../../redux/subscription/Subscription';
import Header4 from '../../components/Header4';
import { useNavigate } from 'react-router-dom';

const SubscriptionPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector((state: RootState) => state.subscriptions);
  

  useEffect(() => {
    dispatch(fetchSubscriptions({ page_no: 1, page_size: 100 }));
  }, [dispatch]);
  const navigate = useNavigate();

  return (
    <>
    <Header4 />
    <Container maxWidth="sm" sx={{ minHeight: '100vh', pt: 8 }}>
      <Grid container justifyContent="center">
        {status === 'loading' && <Typography>Loading...</Typography>}
        {status === 'failed' && <Typography color="error">{error}</Typography>}

        {status === 'succeeded' &&
          items.map((sub: any) => (
            <Card key={sub.id} sx={{ maxWidth: 345, boxShadow: 3, mb: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {sub.subscriptionName}
                </Typography>
                <Typography sx={{ mb: 2, color: 'gray' }}>
                  ${sub.subscriptionPrice}Week
                </Typography>
                <Box sx={{ mb: 2 }}>
            <Typography variant="body1" color="text.secondary">
                <CheckCircle color="success" sx={{ marginRight: 1 }} /> 5 Coin
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <CheckCircle color="success" sx={{ marginRight: 1 }} /> 5 questions
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <CheckCircle color="success" sx={{ marginRight: 1 }} /> Ad-free experience
              </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <AccessTime color="primary" sx={{ mr: 1 }} /> Expires in week end
                  </Typography>
                </Box>
                <Button variant="contained" color="primary" fullWidth onClick={() => navigate('/payment')}>
                  Subscribe Now
                </Button>
              </CardContent>
            </Card>
          ))}
      </Grid>
    </Container>
    </>
  );
};

export default SubscriptionPage;






// import React, { useEffect, useState } from 'react';
// import {
//   Container, Card, CardContent, Typography, Button, Grid, Box
// } from '@mui/material';
// import { AccessTime, CheckCircle } from '@mui/icons-material';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../redux/store';
// import { fetchSubscriptions } from '../../redux/subscription/Subscription';
// import Header4 from '../../components/Header4';
// import { loadStripe } from '@stripe/stripe-js';

// const BaseUrl = 'http://38.242.230.126:5476/';

// const stripePromise = loadStripe('pk_test_51O1xkXB7s8EMuO0l7XBI6YDNb5JsjIIlKIgPIALaJJqw9dzukmfe9vj4I9A9XBrKK9EWJiUW5Y4VF7r8oXGNWBUY00dU6tXH78');

// const SubscriptionPage: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { items, status, error } = useSelector((state: RootState) => state.subscriptions);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     dispatch(fetchSubscriptions({ page_no: 1, page_size: 100 }));
//   }, [dispatch]);

//   const storedUserStr = localStorage.getItem('User');
//   const userId = storedUserStr ? JSON.parse(storedUserStr)?.data?.id : null;

//   const handleSubscribe = async (subscriptionId: string, amount: number) => {
//     setLoading(true);
//     setErrorMessage('');

//     try {
//       const response = await fetch(`${BaseUrl}orders`, {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({ 
//           userId, 
//           subscriptionId, 
//           amount,
//           successUrl: `${window.location.origin}/payment-success`,
//           cancelUrl: `${window.location.origin}/payment-canceled`
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create payment session');
//       }

//       const session = await response.json();
      
//       if (!session?.sessionId) {
//         throw new Error('Invalid session response from server');
//       }

//       const stripe = await stripePromise;
//       if (!stripe) {
//         throw new Error('Stripe failed to initialize');
//       }

//       const { error } = await stripe.redirectToCheckout({
//         sessionId: session.sessionId 
//       });

//       if (error) {
//         throw error;
//       }
//     } catch (err: any) {
//       console.error('Subscription error:', err);
//       setErrorMessage(err.message || 'Failed to initiate payment');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Header4 />
//       <Container maxWidth="sm" sx={{ minHeight: '100vh', pt: 8 }}>
//         <Grid container justifyContent="center">
//           {status === 'loading' && <Typography>Loading plans...</Typography>}
//           {status === 'failed' && <Typography color="error">{error}</Typography>}
          
//           {errorMessage && (
//             <Typography color="error" sx={{ mb: 2 }}>
//               {errorMessage}
//             </Typography>
//           )}

//           {status === 'succeeded' && items.map((sub: any) => (
//             <Card key={sub._id} sx={{ maxWidth: 345, boxShadow: 3, mb: 2 }}>
//               <CardContent>
//                 <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
//                   {sub.subscriptionName}
//                 </Typography>
//                 <Typography sx={{ mb: 2, color: 'gray' }}>
//                   ${sub.subscriptionPrice} per {sub.subscriptionDuration}
//                 </Typography>
//                 <Box sx={{ mb: 2 }}>
//                   <Typography variant="body1" color="text.secondary">
//                     <CheckCircle color="success" sx={{ marginRight: 1 }} /> 5 Coin
//                   </Typography>
//                   <Typography variant="body1" color="text.secondary">
//                     <CheckCircle color="success" sx={{ marginRight: 1 }} /> 5 questions
//                   </Typography>
//                   <Typography variant="body1" color="text.secondary">
//                     <CheckCircle color="success" sx={{ marginRight: 1 }} /> Ad-free experience
//                   </Typography>
//                   <Typography variant="body1" color="text.secondary">
//                     <AccessTime color="primary" sx={{ mr: 1 }} /> Expires in weekend
//                   </Typography>
//                 </Box>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   fullWidth
//                   disabled={loading}
//                   onClick={() => handleSubscribe(sub._id, sub.subscriptionPrice)}
//                 >
//                   {loading ? 'Processing...' : 'Subscribe Now'}
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </Grid>
//       </Container>
//     </>
//   );
// };

// export default SubscriptionPage;


