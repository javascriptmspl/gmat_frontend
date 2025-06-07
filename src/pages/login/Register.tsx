import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { loginUser, registerUser } from "../../redux/api/userApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

interface FormValues {
  userName: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.user);

  const formik = useFormik<FormValues>({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("用戶名稱為必填項"),
      email: Yup.string()
        .email("電子郵箱格式無效")
        .required("電子郵箱為必填項"),
      password: Yup.string()
        .min(8, "密碼至少為8個字符")
        .matches(/[0-9]/, "密碼需包含至少一個數字")
        .required("密碼為必填項"),
    }),
    onSubmit: async (values) => {
      const resultAction = await dispatch(registerUser(values));
      if (registerUser.fulfilled.match(resultAction)) {
        toast.success("用戶註冊成功！");
        navigate("/login");
      }
    },
  });

  const handleGoogleLoginSuccess = async (response: any) => {
    const token = response.credential;

    try {
      const decoded: any = jwtDecode(token);
      const { name, email, sub } = decoded;

      const registrationData = {
        userName: name,
        email:email,
        password: sub, // using Google 'sub' as a password fallback
      };

      // First, try to register the user
      const registerResult = await dispatch(registerUser(registrationData));

      if (registerUser.fulfilled.match(registerResult)) {
        // If registration successful, log the user in
        const loginResult = await dispatch(loginUser({ email, password: sub }));

        if (loginUser.fulfilled.match(loginResult)) {
          toast.success("帳戶已建立並成功登入");
          localStorage.setItem("User", JSON.stringify(loginResult.payload));
          navigate("/dashboard");
          window.location.reload();
        } else {
          toast.error("註冊成功，但登入失敗，請稍後再試");
        }
      } else {
        toast.error("Google 註冊失敗，請確認帳號是否已存在");
      }
    } catch (error) {
      console.error("Google 登入處理失敗:", error);
      toast.error("發生錯誤，請稍後再試");
    }
  };

  const handleGoogleLoginFailure = () => {
    console.error("Login failed");
    toast.error("登入時出錯，請稍後再試");
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="sm"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Paper
          elevation={6}
          sx={{
            mb: 8,
            mt: 12,
            px: 4,
            py: 5,
            borderRadius: "16px",
            width: "100%",
            maxWidth: 450,
            textAlign: "left",
          }}
        >
          {/* Title */}
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            sx={{ color: "#2563eb", mb: 4 }}
          >
            註冊
          </Typography>

          <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            {/* Username */}
            <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
              用戶名稱
            </Typography>
            <TextField
              fullWidth
              margin="dense"
              id="userName"
              name="userName"
              placeholder="用於登錄的專屬名稱"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
              InputLabelProps={{ shrink: false }}
            />

            {/* Email */}
            <Typography variant="subtitle1" fontWeight={600} mt={2} mb={0.5}>
              電子郵箱
            </Typography>
            <TextField
              fullWidth
              margin="dense"
              id="email"
              name="email"
              placeholder="請輸入常用郵箱"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputLabelProps={{ shrink: false }}
            />

            {/* Password */}
            <Typography variant="subtitle1" fontWeight={600} mt={2} mb={0.5}>
              登錄密碼
            </Typography>
            <TextField
              fullWidth
              margin="dense"
              id="password"
              name="password"
              type="password"
              placeholder="至少8位字符且包含數字"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputLabelProps={{ shrink: false }}
            />

            {/* Password info */}
            <Typography
              variant="caption"
              color="text.dark"
              display="block"
              mt={1}
              mb={3}
              sx={{ fontSize: "13px", fontWeight: 500 }}
            >
              密碼必須至少8位且包含數字
            </Typography>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 1,
                backgroundColor: "#0d6efd",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#0b5ed7",
                },
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "註冊"
              )}
            </Button>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              mt: 1,
              mb: 1,
            }}
          >
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
              useOneTap
              theme="outline"
              size="large"
              shape="rectangular"
              text="signup_with" 
            />
          </Box>

          {/* Error */}
          {error && (
            <Typography variant="body2" color="error" mt={2}>
              註冊失敗：{error}
            </Typography>
          )}

          {/* Login link */}
          <Typography mt={3} variant="body2" textAlign="center">
            已有帳號？{" "}
            <Link to="/login" style={{ color: "#2563eb", fontWeight: 600 }}>
              登入
            </Link>
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default RegisterPage;
