import "../assets/css/home.css";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Box,
} from "@mui/material";

const HomePage = () => {
  return (
    <div className="">
      <Header />
      <Container
        maxWidth="sm"
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}
      >
        <Card variant="outlined" sx={{ textAlign: 'center', mt: 4, borderRadius: "16px", boxShadow: 2 }}>
          <CardContent>
            <Box sx={{ mb: 4 ,color:"rgb(41, 112, 236);"}} >
            <i className="fa-solid fa-lock fa-2xl" ></i>
            </Box>
            <Typography variant="h5"  component="div">
            <strong>請先登入或註冊</strong>
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }} color="dark">
             登入後即可使用GMAT智能解題助手，獲取專業的解題指導
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
              <Link to="/login">
                <Button variant="contained" color="primary">
              <i className="fas fa-sign-in-alt"></i>  &nbsp; 登入
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="contained" color="success">
                <i className="fas fa-user-plus"></i> &nbsp;  註冊
                </Button>
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default HomePage;