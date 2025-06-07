import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/api/userApi";
import {
  Box,
  Typography,
  Button,
  Stack,
  Container,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRightFromBracket,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

const Header3 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("User");
    dispatch(logout());
    navigate("/");
  };

  return (
    <Box
      sx={{
        backgroundImage :" linear-gradient(159deg, rgb(9, 30, 189) , rgba(75,0,130,1) )",
        color: "#fff",
        py: 6,
        textAlign: "center",
        // borderRadius: 2,
      }}
    >
      <Container maxWidth="md">
        {/* Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <FontAwesomeIcon icon={faUserShield} className="me-2" />
          &nbsp; GMAT 管理员后台
        </Typography>

        {/* Subtitle */}
        <Typography variant="subtitle1" gutterBottom>
          管理员用户聊天记录和系统设置
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
            component={Link}
            to="/dashboard"
            sx={{ color: "#fff", borderColor: "#fff" }}
            startIcon={<FontAwesomeIcon icon={faHouse} />}
          >
            首页
          </Button>

          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{ color: "#fff", borderColor: "#fff" }}
            startIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
          >
            登出
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Header3;
