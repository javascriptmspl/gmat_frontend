import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/api/userApi";

import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faClockRotateLeft,
  faGear,
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import GoogleTranslate from "./GoogleTranslate";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const storedUserStr = localStorage.getItem("User");
  let User;
  if (storedUserStr) {
    const storedUser = JSON.parse(storedUserStr);
    User = storedUser;
  }

  const handleLogout = () => {
    localStorage.removeItem("User");
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundImage :" linear-gradient(159deg, rgb(9, 30, 189) , rgba(75,0,130,1) )",
        color: "#fff",
        px: { xs: 1, md: 4 },
        pt: 2,
        pb: 5,
      }}
    >
      <Container disableGutters maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "flex-end" }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: "999px",
              background: "#eaeff7",
            }}
          >
            {User?.isSuccess ? (
              <>
               <GoogleTranslate />
              {User?.data?.role === 'admin'?  <>
                <Button
                  component={Link}
                  to="#"
                  size="small"
                  variant="outlined"
                  sx={{
                    borderRadius: "999px",
                    borderColor: "#000",
                    color: "#000",
                    fontWeight: 500,
                    px: 2,
                  }}
                  startIcon={<FontAwesomeIcon icon={faCircleUser} />}
                >
                  admin
                </Button>
                <Button
                  component={Link}
                  to="/chat-log"
                  size="small"
                  variant="outlined"
                  sx={{
                    borderRadius: "999px",
                    borderColor: "rgba(198, 200, 209, 0.82)",
                    color: "rgba(98, 100, 109, 0.82)",
                    fontWeight: 500,
                    px: 2,
                  }}
                  startIcon={<FontAwesomeIcon icon={faClockRotateLeft} />}
                >
                  聊天歷史
                </Button>
                <Button
                  component={Link}
                  to="#"
                  size="small"
                  variant="outlined"
                  sx={{
                    borderRadius: "999px",
                    borderColor: "#0d6efd",
                    color: "#0d6efd",
                    fontWeight: 500,
                    px: 2,
                  }}
                  startIcon={<FontAwesomeIcon icon={faGear} />}
                >
                  管理後台
                </Button>
                </>
                : "" }
              
                <Button
                  onClick={handleLogout}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderRadius: "999px",
                    borderColor: "#dc3545",
                    color: "#dc3545",
                    fontWeight: 500,
                    px: 2,
                  }}
                  startIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
                >
                  登出
                </Button>
              </>
            ) : (
              <>
              <GoogleTranslate />
                <Button
                  component={Link}
                  to="/login"
                  size="small"
                  variant="outlined"
                  sx={{
                    borderRadius: "999px",
                    borderColor: "#0d6efd",
                    color: "#0d6efd",
                    fontWeight: 600,
                    px: 2,
                  }}
                  startIcon={<FontAwesomeIcon icon={faRightToBracket} />}
                >
                  登入
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  size="small"
                  variant="outlined"
                  sx={{
                    borderRadius: "999px",
                    borderColor: "#198754",
                    color: "#198754",
                    fontWeight: 600,
                    px: 2,
                  }}
                  startIcon={<FontAwesomeIcon icon={faUserPlus} />}
                >
                  註冊
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>

        <Box mt={4} textAlign="center">
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" } }}
          >
            GMAT 智能解題助手
          </Typography>
          <Typography
            variant="subtitle1"
            mt={1}
            sx={{ fontSize: { xs: "1rem", md: "1.2rem" }, color: "#f0f0f0" }}
          >
            選擇您需要的題目類型，開始智能解題之旅
          </Typography>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
