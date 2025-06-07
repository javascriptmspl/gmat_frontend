import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faChalkboardUser,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import { FaLightbulb, FaSearch, FaEdit } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { askQuestion } from "../../redux/chat/chatSlice";
import Header2 from "../../components/Header2";
import Footer from "../../components/Footer";
import {
  ChatHistoryById,
  fetchChatHistory,
} from "../../redux/chat/chatHistorySlice";
import { useParams } from "react-router-dom";
import Planpopup from "../../components/Planpopup";

const Search = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupShown, setPopupShown] = useState(false);
  const [plan, SetPlan] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editInput, setEditInput] = useState<string>("");

  const { botId } = useParams();

  const [localMessagesByBotId, setLocalMessagesByBotId] = useState<{
    [key: string]: { user: string; reply?: string }[];
  }>({});

  const storedUserStr = localStorage.getItem("User");
  let userId: string | undefined;
  if (storedUserStr) {
    const storedUser = JSON.parse(storedUserStr);
    userId = storedUser.data?._id;
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessagesByBotId, botId]);

  const cardData = [
    {
      title: "簡單解釋",
      description: "以高中生能理解的方式解釋解題步驟",
      icon: (
        <FontAwesomeIcon icon={faChalkboardUser} size="xl" style={{ color: "#2e73ea" }} />
      ),
    },
    {
      title: "快速解法",
      description: "提供最快捷的解題方法，減少計算量",
      icon: <FontAwesomeIcon icon={faBolt} size="xl" style={{ color: "#2e73ea" }} />,
    },
    {
      title: "變體題目",
      description: "生成類似的練習題，鞏固解題方法",
      icon: <FontAwesomeIcon icon={faShuffle} size="xl" style={{ color: "#2e73ea" }} />,
    },
    {
      title: "觀念補充",
      description: "分析題目測試的數學概念與知識點",
      icon: <FaLightbulb size={28} color="#2e73ea" />,
    },
    {
      title: "題型總察",
      description: "識別適用此解法的題目特徵",
      icon: <FaSearch size={28} color="#2e73ea" />,
    },
  ];

  const handleSend = async () => {
    if (!input.trim() || !userId || !botId) return;

    const userMessage = input.trim();

    setLocalMessagesByBotId((prev) => {
      const prevMessages = prev[botId] || [];
      return {
        ...prev,
        [botId]: [...prevMessages, { user: userMessage }],
      };
    });

    const response = await dispatch(
      askQuestion({ question: userMessage, userId, botId })
    );

    if (response?.payload) {
      SetPlan(false);

      const historyRes = await dispatch(fetchChatHistory({ userId }));
      const history = historyRes?.payload?.history || [];
      const redeemedLimit = localStorage.getItem("redeemed") === "10" ? 10 : 5;
      if (history.length  >= redeemedLimit) {
        SetPlan(true);
        setOpenPopup(true);
        setPopupShown(true);
      }
      

      const botReply = response.payload.answer || "回覆內容";

      setLocalMessagesByBotId((prev) => {
        const prevMessages = prev[botId] || [];
        const updatedMessages = [...prevMessages];

        const lastUserMsgIndex = [...prevMessages]
          .reverse()
          .findIndex((msg) => msg.user);
        const actualIndex =
          lastUserMsgIndex !== -1
            ? prevMessages.length - 1 - lastUserMsgIndex
            : -1;

        if (actualIndex !== -1) {
          updatedMessages[actualIndex] = {
            ...updatedMessages[actualIndex],
            reply: botReply,
          };
        } else {
          updatedMessages.push({ user: "", reply: botReply });
        }

        return {
          ...prev,
          [botId]: updatedMessages,
        };
      });
    }

    setInput("");
  };

  const handleEditSend = async (index: number) => {
    if (!editInput.trim() || !userId || !botId) return;

    setLocalMessagesByBotId((prev) => {
      const updated = [...(prev[botId] || [])];
      updated[index] = { ...updated[index], user: editInput, reply: undefined };
      return { ...prev, [botId]: updated };
    });

    const response = await dispatch(
      askQuestion({ question: editInput, userId, botId })
    );

    if (response?.payload) {
      const botReply = response.payload.answer || "回覆內容";
      setLocalMessagesByBotId((prev) => {
        const updated = [...(prev[botId] || [])];
        updated[index] = { ...updated[index], reply: botReply };
        return { ...prev, [botId]: updated };
      });
    }

    setEditIndex(null);
    setEditInput("");
  };

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId || !botId) return;

      SetPlan(false);

      const res = await dispatch(ChatHistoryById({ userId, botId }));
      const history = res?.payload?.history || [];
      const redeemedLimit = localStorage.getItem("redeemed") === "10" ? 10 : 5;
      if (history.length >= redeemedLimit && !popupShown) {
        SetPlan(true);
        setOpenPopup(true);
        setPopupShown(true);
      }
    };

    fetchHistory();
  }, [dispatch, userId, botId, popupShown]);

  const currentMessages = localMessagesByBotId[botId as any] || [];

  
  
  return (
    <>
      <Header2 botId={botId} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="space-around" mb={3} flexWrap="wrap" gap={2}>
          {cardData.map((card, idx) => (
            <Paper
              key={idx}
              onClick={() => setSelectedCardIndex(idx)}
              sx={{
                width: 1,
                maxWidth: 170,
                textAlign: "center",
                p: 2,
                borderRadius: 3,
                transition: "all 0.3s ease",
                cursor: "pointer",
                border: selectedCardIndex === idx ? "2px solid #2e73ea" : "1px solid transparent",
                backgroundColor: selectedCardIndex === idx ? "white" : "white",
              }}
            >
              <Box mb={1}>{card.icon}</Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </Paper>
          ))}
        </Box>

        <Typography sx={{ p: 2, minHeight: 200, mb: 2, borderRadius: 3, border: "1px solid gray" }}>
          <Paper sx={{ p: 2, height: "400px", overflow: "auto" }}>
            {currentMessages.map((msg, index) => (
              <Box key={index} mb={3}>
                {msg.user && (
                  <Box display="flex" justifyContent="flex-end" mb={1} alignItems="center" gap={1}>
                    <Box
                      sx={{
                        bgcolor: "#2e73ea",
                        color: "white",
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        maxWidth: 600,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {editIndex === index ? (
                        <TextField
                          fullWidth
                          multiline
                          value={editInput}
                          onChange={(e) => setEditInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleEditSend(index);
                            }
                          }}
                          sx={{ backgroundColor: "white", borderRadius: 1 }}
                        />
                      ) : (
                        msg.user
                      )}
                    </Box>
                    {editIndex !== index && (
                      <FaEdit
                        style={{
                          cursor: "pointer",
                          color: "#ffffff",
                          backgroundColor: "#2e73ea",
                          borderRadius: 4,
                          padding: 4,
                        }}
                        onClick={() => {
                          setEditIndex(index);
                          setEditInput(msg.user);
                        }}
                      />
                    )}
                  </Box>
                )}
                {msg.reply && (
                  <Box display="flex" justifyContent="flex-start">
                    <Box
                      sx={{
                        bgcolor: "#f0f0f0",
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        maxWidth: 600,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {msg.reply}
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
            <div ref={bottomRef} />
          </Paper>

          <Box display="flex" alignItems="center" sx={{ marginTop: 2 }}>
            <TextField
              multiline
              placeholder="請輸入您的GMAT數學問題…"
              fullWidth
              minRows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={{ borderRadius: "8px 0px 0px 8px" }}
            />
            <Button
              variant="contained"
              disabled={plan}
              sx={{
                backgroundImage: "linear-gradient(159deg, rgb(9, 30, 189), rgba(75, 0, 130, 1))",
                minWidth: 100,
                height: "80px",
                borderRadius: "0 25px 25px 0",
              }}
              onClick={handleSend}
            >
              <FiSend style={{ marginRight: 8 }} /> 發送
            </Button>
          </Box>
        </Typography>
      </Container>
      <Footer />
      <Planpopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
    </>
  );
};

export default Search;
