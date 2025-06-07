import "./assets/App.css";
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/Home';
import LoginPage from './pages/login/Login';
import RegisterPage from "./pages/login/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Search from "./pages/search/Search";
import ChatHistory from "./pages/chat/Admin-chat-history";
import ChatDetail from "./pages/chat/Admin-chat-details";
import ClientChatHistory from "./pages/chat/client-chat-history";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import SubscriptionPage from "./pages/Subscription/Subscription";
import StripeStylePaymentPage from "./pages/Subscription/Paymentpage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/search/:botId" element={<ProtectedRoute><Search /></ProtectedRoute>} />
        <Route path="/chat-log" element={<ProtectedRoute><ChatHistory /></ProtectedRoute>} />
        <Route path="/chat-details" element={<ProtectedRoute><ChatDetail /></ProtectedRoute>} />
        <Route path="/client-chat-history" element={<ProtectedRoute><ClientChatHistory /></ProtectedRoute>} />
        <Route path="/subscription" element={<ProtectedRoute><SubscriptionPage /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><StripeStylePaymentPage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;
