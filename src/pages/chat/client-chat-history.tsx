import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const ClientChatHistory: React.FC = () => {
  const {chathistory } = useSelector((state:RootState )=>state.chatHistory)
  const AllChat = chathistory?.history ?? [];
  console.log("AllChat",AllChat);
  
  return (
   
      <Paper
        elevation={3}
        sx={{
         
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: 600,
          borderRadius: 2,
          mx: 'auto',
          my:'auto',
          mt:5,
          p: 3,
          bgcolor: '#fff',
        }}
      >
        <Button
          component={RouterLink}
          to="/dashboard"
          variant="outlined"
          size="small"
          sx={{
            mb: 2,
            textTransform: 'none',
            fontSize: '14px',
            padding: '4px 12px',
            color: "#9e9e9e",
            borderColor: "#bdbdbd",
            // backgroundColor: "#f5f5f5",
          }}
        >
          返回首頁
        </Button>

        <Typography
          variant="h6"
          align="center"
          fontWeight="bold"
          sx={{ mb: 3 }}
        >
          聊天歷史
        </Typography>

        <Box
          sx={{
            backgroundColor: '#d4f1f9',
            borderRadius: 1,
            px: 2,
            py: 1.5,
            fontSize: '15px',
            color: '#000',
            height: "550px",
            overflow: "auto",
          
          }}
        >
           {AllChat && AllChat.length > 0 ? (
          AllChat.map((chat: any, index: number) => (
            <Box
              key={index}
              sx={{
                mb: 2,
                p: 2,
                backgroundColor: '#ffffff',
                borderRadius: 2,
                border: '1px solid #ccc',
                
              }}
            >
              <Typography fontWeight="bold" sx={{ mb: 1 }}>
                問題：
              </Typography>
              <Typography sx={{ mb: 2 }}>{chat.question}</Typography>

              <Typography fontWeight="bold" sx={{ mb: 1 }}>
                回覆：
              </Typography>
              <Typography>{chat.answer}</Typography>
            </Box>
          ))
        ) : (
          <Typography>您還沒有任何聊天記錄。</Typography>
        )}
        </Box>
      </Paper>
    
  );
};

export default ClientChatHistory;

