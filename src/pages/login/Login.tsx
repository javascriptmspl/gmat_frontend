import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { loginUser, clearStatus, registerUser } from "../../redux/api/userApi";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import Header from "../../components/Header";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    return () => {
      dispatch(clearStatus());
    };
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("用戶名為必填項"),
      password: Yup.string().required("密碼為必填項"),
    }),
    onSubmit: async (values) => {
      const selectedLang = localStorage.getItem("GOOGLE_TRANSLATE_LANG");

      try {
        const resultAction = await dispatch(loginUser(values));

        if (loginUser.fulfilled.match(resultAction)) {
          toast.success("用戶登入成功");
          localStorage.setItem("User", JSON.stringify(resultAction.payload));

          if (selectedLang && selectedLang !== "zh-CN") {
            // setTimeout(() => {
              // window.location.href = "/dashboard";
              navigate("/dashboard");
            // }, 500);
          } else {
            navigate("/dashboard");
            // window.location.reload();
          }
        } else {
          // const errMsg =
          //   resultAction.payload || resultAction.error?.message || "登入失敗";
          // toast.error(errMsg);

          if (selectedLang && selectedLang !== "en") {
            // setTimeout(() => {
              // window.location.href = "/login";
              navigate("/login");
            // }, 500);
          }
        }
      } catch (err: any) {
        console.error("Login error:", err);
        toast.error("登入時出錯，請稍後再試");

        if (selectedLang && selectedLang !== "zh-CN") {
          setTimeout(() => {
            window.location.href = "/login";
          }, 100);
        }
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
        password: sub,
      };

      const loginResult = await dispatch(loginUser({ email, password: sub }));

      if (loginUser.fulfilled.match(loginResult)) {
        toast.success("Google 登入成功");
        localStorage.setItem("User", JSON.stringify(loginResult.payload));
        navigate("/dashboard");
        window.location.reload();
      } else {
        const registerResult = await dispatch(registerUser(registrationData));
        if (registerUser.fulfilled.match(registerResult)) {
          const secondLogin = await dispatch(
            loginUser({ email, password: sub })
          );

          if (loginUser.fulfilled.match(secondLogin)) {
            toast.success("帳戶已建立並成功登入");
            localStorage.setItem("User", JSON.stringify(secondLogin.payload));
            navigate("/dashboard");
            // window.location.reload();
          } else {
            toast.error("註冊成功，但登入失敗");
          }
        } else {
          toast.error("Google 註冊失敗");
        }
      }
    } catch (err) {
      console.error("Google login error:", err);
      toast.error("Google 登入時出錯，請稍後再試");
    }
  };

  const handleGoogleLoginFailure = () => {
    console.error("Login failed");
    toast.error("登入時出錯，請稍後再試");
  };

  return (
    <>
      <Header />
      <Box
        minHeight="60vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: "#f6f7fb" }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 400,
            borderRadius: 3,
            boxShadow: 3,
            p: 3,
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              fontWeight="bold"
              align="center"
              mb={3}
              sx={{ color: "#2563eb" }}
            >
              登入
            </Typography>

            <form onSubmit={formik.handleSubmit} noValidate>
              <Box mb={2}>
                <label
                  htmlFor="email"
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                 用户电子邮件
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "16px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    outline: "none",
                  }}
                />
                {formik.touched.email && formik.errors.email && (
                  <Typography color="error" variant="caption">
                    {formik.errors.email}
                  </Typography>
                )}
              </Box>

              <Box mb={2}>
                <label
                  htmlFor="password"
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  密碼
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "16px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    outline: "none",
                  }}
                />
                {formik.touched.password && formik.errors.password && (
                  <Typography color="error" variant="caption">
                    {formik.errors.password}
                  </Typography>
                )}
              </Box>

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
                  <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : (
                  "登入"
                )}
              </Button>
            </form>
            <Box
              mt={2}
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="100%"
            >
              <Typography
                variant="body2"
                fontWeight="bold"
                mb={1}
                sx={{ color: "#333" }}
              >
                使用 Google 登入
              </Typography>

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
                  text="signin_with"
                />
              </Box>
            </Box>

            {error && (
              <Typography color="error" variant="body2" mt={1}>
                登入失敗：{error}
              </Typography>
            )}

            <Box textAlign="center" mt={2}>
              <Typography variant="body2" fontWeight="bold">
                還沒有帳號？{" "}
                <Link
                  to="/register"
                  style={{ color: "#0d6efd", fontWeight: 600 }}
                >
                  註冊
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default LoginPage;
