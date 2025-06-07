import { configureStore } from '@reduxjs/toolkit';
import userReducer from './api/userApi';
import chatReducer from './chat/chatSlice';
import chatHistoryReducer from './chat/chatHistorySlice' ; 
import logReducer from './chat/adminChathistorySlice' ;
import botReducer from './bot/boat' ; 
import subscriptionsReducer from './subscription/Subscription' ;






export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    chatHistory: chatHistoryReducer,
    logs: logReducer,
    bots: botReducer,
    subscriptions: subscriptionsReducer,
  
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
