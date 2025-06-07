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
  faHouse,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
// import GoogleTranslate from "./GoogleTranslate";

const Header4 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  


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
               {/* <GoogleTranslate /> */}
              {/* {User?.data?.role === 'admin'?  <>
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
                </>
                : "" } */}
                <Button
                  component={Link}

                  size="small"
                  variant="outlined"
                   to="/dashboard"
                  sx={{
                    borderRadius: "999px",
                    borderColor: "#0d6efd",
                    color: "#0d6efd",
                    fontWeight: 500,
                    px: 2,
                  }}
                  startIcon={<FontAwesomeIcon icon={faHouse} />}
                >
                  首頁
                </Button>
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
          </Stack>
        </Toolbar>

        <Box mt={4} textAlign="center">
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" } }}
          >
            订阅我们的方案
          </Typography>
          <Typography
            variant="subtitle1"
            mt={1}
            sx={{ fontSize: { xs: "1rem", md: "1.2rem" }, color: "#f0f0f0" }}
          >
           获取专属功能和优惠的使用权限
          </Typography>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header4;
