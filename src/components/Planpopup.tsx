import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Planpopup = ({
  openPopup,
  setOpenPopup,
}: {
  openPopup: boolean;
  setOpenPopup: (val: boolean) => void;
}) => {
  const navigate = useNavigate();

  const [showRedeem, setShowRedeem] = useState(false);
  const [redeemCode, setRedeemCode] = useState("");
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "">("");

  const handleRedeem = () => {
    if (!redeemCode.trim()) {
      setError("請輸入兌換碼");
      showToast("請輸入兌換碼", "error");
    } else if (redeemCode.trim().toUpperCase() === "CODE123") {
      setError("");
      showToast("兌換成功！", "success");
      setRedeemCode("");
      setShowRedeem(false);
      setOpenPopup(false);
      localStorage.setItem("redeemed", "10");
    } else {
      setError("無效的兌換碼");
      showToast("無效的兌換碼", "error");
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);

    // Hide after 3 seconds
    setTimeout(() => {
      setToastMessage("");
      setToastType("");
    }, 3000);
  };

  return (
    <>
      {toastMessage && (
        <Box
          sx={{
            position: "fixed",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: toastType === "success" ? "#4caf50" : "#f44336",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "4px",
            zIndex: 9999,
          }}
        >
          {toastMessage}
        </Box>
      )}

      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <DialogTitle sx={{ fontWeight: "bold", color: "#2e73ea" }}>
          訂閱我們的方案
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            您的免費提問次數已用完。若想繼續提問，請升級您的訂閱方案。
            獲得專屬功能與優惠的使用權限。
          </Typography>

          <Box mt={2}>
            <Button variant="text" onClick={() => setShowRedeem(!showRedeem)}>
              {showRedeem ? "隱藏兌換碼欄位" : "我有兌換碼"}
            </Button>

            {showRedeem && (
              <Box mt={2}>
                <TextField
                  label="輸入兌換碼"
                  fullWidth
                  value={redeemCode}
                  onChange={(e) => setRedeemCode(e.target.value)}
                  error={Boolean(error)}
                  helperText={error}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 2 }}
                  onClick={handleRedeem}
                >
                  兌換
                </Button>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/subscription")}
          >
            立即訂閱
          </Button>
          <Button variant="outlined" onClick={() => setOpenPopup(false)}>
            取消
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Planpopup;
