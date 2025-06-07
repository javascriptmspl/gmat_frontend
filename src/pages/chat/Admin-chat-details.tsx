import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { ChatHistoryById } from "../../redux/chat/chatHistorySlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

interface ChatItem {
  _id: string;
  userId: string;
  botId: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
  user: {
    userName: string;
    email: string;
  };
  bot: {
    displayName: string;
  };
}

const ChatDetail = () => {
  const location = useLocation();
  const { userId, botId, createdAt } = location.state || {}; 
  const dispatch = useDispatch<AppDispatch>();

  const [filteredHistory, setFilteredHistory] = useState<ChatItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId || !botId || !createdAt) return;

      const res = await dispatch(ChatHistoryById({ userId, botId }) as any);
      const data = res?.payload?.history || [];

      // Filter by exact createdAt match
      const filtered = data.filter(
        (item: ChatItem) => item.createdAt === createdAt
      );

      setFilteredHistory(filtered);
    };

    fetchHistory();
  }, [dispatch, userId, botId, createdAt]);

  return (
    <Box sx={{ p: 5, mt: 5 }}>
      {/* Top Bar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">聊天详情</Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            component={Link}
            to="/chat-log"
            sx={{
              color: "#9e9e9e",
              borderColor: "#bdbdbd",
              "&:hover": {
                borderColor: "#9e9e9e",
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            返回用户聊天列表
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to="/dashboard"
            sx={{
              color: "#9e9e9e",
              borderColor: "#bdbdbd",
              "&:hover": {
                borderColor: "#9e9e9e",
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            返回首页
          </Button>
        </Stack>
      </Box>

      {/* Chat Meta Info */}
      {filteredHistory.length > 0 && (
        <Paper variant="outlined" sx={{ p: 2, mb: 3, backgroundColor: "#f5f5f5" }}>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={2}>
            <Typography>
              <strong>用户：</strong> {filteredHistory[0]?.user?.userName}
            </Typography>
            <Typography>
              <strong>类别：</strong> {filteredHistory[0]?.bot?.displayName}
            </Typography>
            <Typography>
              <strong>时间：</strong> {new Date(filteredHistory[0]?.createdAt).toLocaleDateString()}{" "}
              {new Date(filteredHistory[0]?.createdAt).toLocaleTimeString()}
            </Typography>
          </Stack>
        </Paper>
      )}

      {/* Chat History Rendering */}
      {filteredHistory.map((item, index) => (
        <React.Fragment key={index}>
          {/* User Message */}
          <Paper sx={{ p: 2, mb: 3, backgroundColor: "#e3f2fd", marginRight: "30vw" }}>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              <strong>用户：</strong> {item.user.userName} ({item.user.email}) —{" "}
              {new Date(item.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body2">{item.question}</Typography>
          </Paper>

          {/* AI Message */}
          <Paper sx={{ p: 2, mb: 3, backgroundColor: "#f1f8e9", marginLeft: "30vw" }}>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              <strong>AI助手：</strong> {item.bot.displayName} —{" "}
              {new Date(item.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body2">{item.answer}</Typography>
          </Paper>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default ChatDetail;
