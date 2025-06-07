import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/api/userApi";

import {
  Box,
  Button,
  Typography,

  Paper,
  Stack,
  Container,
} from "@mui/material";


import {
  // faCalculator,
  faClockRotateLeft,
  faHouse,
  faRightFromBracket,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { BotsById } from "../redux/bot/boat";
import { RootState } from "../redux/store";
// import GoogleTranslate from "./GoogleTranslate";

interface Header2Props {
  botId?: any;
}

const Header2: React.FC<Header2Props> = () => {
  const { botId } = useParams<{ botId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const botsData = useSelector((state: RootState) => state.bots.bots);
  const bot = botsData?.find((bot) => bot._id === botId);

  useEffect(() => {
    if (botId && !bot) {
      dispatch(BotsById({ botId })as any);
    }
  }, [dispatch, botId, bot]);

  const handleLogout = () => {
    localStorage.removeItem("User");
    dispatch(logout());
    navigate("/");
  };

  return (
    <Box
      sx={{

        backgroundImage: " linear-gradient(159deg, rgb(9, 30, 189) , rgba(75,0,130,1) )",
        color: "#fff",
        p: 3,
        position: "relative",
        overflow: "hidden",
        borderRadius: "4px",
      }}
    >
      {/* Wallet Box - Top Right */}
      <Paper
        elevation={3}
        sx={{
          position: "absolute",
          top: 18,
          right: 16,
          px: 2,
          py: 2,
          me: 2,
          borderRadius: 2,
          textAlign: "right",
          backgroundColor: "#fff",
          minWidth: 100,
        }}
      >
        {/* <GoogleTranslate /> */}
        <Typography
          variant="body2"
          fontWeight="bold"
          sx={{
            color: "#3a86ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-center",
          }}
        >
          <FontAwesomeIcon icon={faWallet} className="m-2" style={{ color: "#000000" }} />
          &nbsp; ¥0.00
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#3a86ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-center",
            mt: 0.5,
          }}
        >
          <FontAwesomeIcon icon={faClockRotateLeft} style={{ color: "#000000" }} />
          &nbsp; 0  <span style={{ color: "#000000" }} >&nbsp; 天後重置</span>
        </Typography>
      </Paper>

      {/* Center Content */}
      <Container maxWidth="md">
        <Box textAlign="center" mt={5}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
             {bot && (
              <img
                src={`https://38.242.230.126:5476/${bot?.avatar}`} 
               
                style={{ width: 40, height: 40, marginRight: 10 }}
              />
            )}
            &nbsp;GMAT 智能解題助手
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            數學問題解析，提供詳細步驟與快速解法
          </Typography>

          {/* Buttons */}
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            mt={3}
            flexWrap="wrap"
          >
            <Button
              variant="outlined"
              color="inherit"
              component={Link}
              to="/dashboard"
              sx={{ color: "#fff", borderColor: "#fff" }}
              startIcon={<FontAwesomeIcon icon={faHouse} />}
            >
              首頁
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              component={Link}
              to="/client-chat-history"
              sx={{ color: "#fff", borderColor: "#fff" }}
              startIcon={<FontAwesomeIcon icon={faClockRotateLeft} />}
            >
              歷史記錄
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              onClick={handleLogout}
              sx={{ color: "#fff", borderColor: "#fff" }}
              startIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
            >
              登出
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Header2;
