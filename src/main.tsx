import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { ToastContainer } from "react-toastify";
import { BrowserRouter  as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";



const clientId = "362630921930-35qc7qft2qprdft3pl2p6gku4e8p6qtq.apps.googleusercontent.com"



createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    
     <GoogleOAuthProvider clientId={clientId}>
     
    <ToastContainer />
    <Router>
      <App />
    </Router>
   
      </GoogleOAuthProvider>
      
  </Provider>
);
