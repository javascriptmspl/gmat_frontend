// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Checkbox,
//   Container,
//   Grid,
//   List,
//   ListItem,
//   // ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Paper,
//   Typography,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {

//   History,

// } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import Header3 from "../../components/Header3";
// import Footer from "../../components/Footer";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faComment,
//   faComments,
//   faSquare,
//   faSquareCheck,
//   faTrashCan,
//   faUser,
//   faUsers,
// } from "@fortawesome/free-solid-svg-icons";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllUser } from "../../redux/api/userApi";
// import { RootState } from "../../redux/store";
// import { fetchChatHistory } from "../../redux/chat/chatHistorySlice";
// import { DeleteLogs } from "../../redux/chat/adminChathistorySlice";



// const GradientHeader = styled(Box)({
//   background: "linear-gradient(to right, #1c59bb, #4412b9)",
//   color: "white",
//   padding: "12px 5px",
//   borderRadius: "10px 10px 10px 10px",
//   // display: "flex",
//   alignItems: "center",
//   fontWeight: "bold",
//   height: "18vh",
// });
// const GradientHeader2 = styled(Box)({
//   background: "linear-gradient(to right, #1c59bb, #4412b9)",
//   color: "white",
//   padding: "12px 20px",
//   borderTopLeftRadius: 10,
//   borderTopRightRadius: 10,
//   display: "flex",
//   alignItems: "center",
//   fontWeight: "bold",
//   // height:"18vh"
// });

// const ChatLogManager: React.FC = () => {
//   const dispatch = useDispatch();
//   const [selectedUser, setSelectedUser] = useState<any>([]);
//   const [selectedLogs, setSelectedLogs] = useState<any[]>([]);
//   const store = useSelector((state: RootState) => state.user)
//   console.log(store, "useruseruser");
//   const Users = store?.users || [];
// const userId = Users[0]?._id;


//   const HistoryChat = useSelector((state: RootState) => state.chatHistory.chathistory);
//   const chatlog =HistoryChat?.history || [];
//   console.log("logs22",chatlog);

//   const log = Array.from(
//     new Map(
//       chatlog
//         ?.filter((item) => item?.bot?._id)
//         .map((item) => [item.bot._id, item.bot])
//     ).values()
//   );
  
//   console.log("logs",log);


//   useEffect(() => {
//     dispatch(getAllUser() as any)
   
//   }, [dispatch,userId])

//   const handleUserClick = (user: any) => {
//     setSelectedUser(user);
//     dispatch(fetchChatHistory({ userId: user._id }) as any);
//   };

//   const toggleLogSelection = (index: number) => {
//     setSelectedLogs((prev) =>
//       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
//     );
//   };

//   const toggleSelectAll = () => {
//     if (selectedLogs.length >= chatlog.length) {
//       setSelectedLogs([]);
//     } 
//     else {
//       setSelectedLogs(chatlog.map((_, i) => i));
//     }
    
//   };

//   const handleDeleteSelected = async () => {
//     const logsToDelete = selectedLogs.map((index) => chatlog[index]._id);
  
//     if (logsToDelete.length > 0) {
//       await dispatch(DeleteLogs(logsToDelete) as any);
//       setSelectedLogs([]);
  
     
//       if (selectedUser?._id) {
//         dispatch(fetchChatHistory({ userId: selectedUser._id }) as any);
//       }
//     }
//   };
  
  

//   return (
//     <>
//       <Header3 />
//       <Container maxWidth="lg" sx={{ my: 5 }}>
//         <Paper
//           elevation={4}
//           sx={{
//             borderRadius: 3,
//             p: 3,
//             // boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.08)", 
//           }}
//         >
//           <Typography variant="h5" fontWeight="bold" mb={3}>
//             <FontAwesomeIcon icon={faComments} style={{ color: "#04070c" }} />
//             &nbsp; 聊天记录管理
//           </Typography>

//           <Grid container spacing={2} minHeight={"50vh"}>
//             <Grid width="25vw">
//               <Paper elevation={3} sx={{ borderRadius: 2 }}>
//                 <GradientHeader>
//                   <FontAwesomeIcon
//                     icon={faUsers}
//                     style={{ marginLeft: "20px", color: "#ffffff" }}
//                   />{" "}
//                   &nbsp; 用户列表
//                   <List
//                     sx={{
//                       height: "65vh",
//                       overflowY: "auto",
//                       width: "24.7vw",
//                       borderRadius: "0 0 10px 10px",
//                       // backgroundColor: "#fff",
//                       "&::-webkit-scrollbar": {
//                         width: "6px",
//                       },
//                       "&::-webkit-scrollbar-track": {
//                         background: "transparent",
//                       },
//                       "&::-webkit-scrollbar-thumb": {
//                         backgroundColor: "rgba(0,0,0,0.2)",
//                         borderRadius: "4px",
//                       },
//                       scrollbarWidth: "thin", 
//                       scrollbarColor: "rgba(214, 214, 214, 0.84) transparent",
//                       "&:not(:hover)::-webkit-scrollbar-thumb": {
//                         backgroundColor: "transparent",
//                       },
//                     }}
//                   >
//                     {Users.map((item, index) => (
//                       <ListItem
//                         sx={{
//                           color: "#000",
//                             cursor: "pointer",
//                             backgroundColor: selectedUser?._id === item._id ? "#f0f0f0" : "transparent",
//                           // "&:hover": {
//                           //   backgroundColor: "rgba(214, 214, 214, 0.84) ",
//                           // },
//                           borderRadius: "0 0 10px 10px",
//                           width: "100%",
                         
//                           height: "11.7vh",
//                         }}
//                         onClick={() => handleUserClick(item)}
//                         // disablePadding
//                         key={index}
//                       >
                       
//                           <ListItemText
//                           sx={{
//                             cursor: "pointer",
//                             backgroundColor: selectedUser?._id === item._id ? "#f0f0f0" : "transparent",  
//                             borderRadius: "0 0 10px 10px",
                         
//                           }}
//                           onClick={() => handleUserClick(item)}

//                             primary={
//                               <Typography component="span">
//                                 <FontAwesomeIcon
//                                   icon={faUser}
//                                   style={{ color: "#233658", marginLeft: "10px" }}
//                                 />
//                                 &nbsp;
//                                 <Typography
//                                   component="span"
//                                   fontWeight="bold"
//                                   color="primary"
//                                   sx={{ display: "inline" }}
//                                 >
//                                   &nbsp;{item.userName}
//                                 </Typography>
//                                 <Typography
//                                   component="span"
//                                   color="text.secondary"
//                                   sx={{ display: "inline", ml: 1 }}
//                                 >
//                                   &nbsp;({item.email})
//                                 </Typography>
//                               </Typography>
//                             }
//                           />
                 
//                       </ListItem>
//                     ))}
//                   </List>
//                 </GradientHeader>
//               </Paper>
//             </Grid>

//             {/* Chat Logs Panel */}
//             <Grid width="50vw">
//               <Paper elevation={1} sx={{ borderRadius: 2 }}>
//                 <GradientHeader2>
//                   <History sx={{ mr: 1 }} /> 聊天记录列表
//                 </GradientHeader2>

//                 <Box p={2}>
//                   <Box display="flex" gap={2} mb={2}>
//                     <Button
//                       variant="contained"
//                       color="error"
//                       startIcon={
//                         <FontAwesomeIcon
//                           icon={faTrashCan}
//                           style={{ color: "#ffffff" }}
//                         />
//                       }
//                       onClick={handleDeleteSelected}
//                       sx={{ borderRadius: 5 }}
//                     >
//                       &nbsp; 删除选中
//                     </Button>
//                     <Button
//                       variant="contained"
//                       startIcon={
//                         <FontAwesomeIcon
//                           icon={faSquareCheck}
//                           style={{ color: "#fcfcfc" }}
//                         />
//                       }
//                       onClick={toggleSelectAll}
//                       sx={{ borderRadius: 5, bgcolor: "Gray" }}
//                     >
//                       &nbsp; 全选
//                     </Button>
//                     <Button
//                       variant="contained"
//                       // color="secondary"

//                       startIcon={
//                         <FontAwesomeIcon
//                           icon={faSquare}
//                           style={{ color: "#fafafa" }}
//                         />
//                       }
//                       onClick={() => setSelectedLogs([])}
//                       sx={{ borderRadius: 5, bgcolor: "Gray" }}
//                     >
//                       &nbsp; 取消全选
//                     </Button>
//                   </Box>

//                   <List>
//                     {chatlog.map((item, index) => (
//                       <ListItem key={index} sx={{ px: 0 }}>
                        
//                         <ListItemIcon sx={{ minWidth: "40px" }}>
//                           <Checkbox
//                             edge="start"
//                             checked={selectedLogs.includes(index)}
//                             onChange={() => toggleLogSelection(index)}
//                           />
//                         </ListItemIcon>

//                         <Link
//                           to="/chat-details"
//                           state={{ userId: item?.userId, botId: item?.botId, createdAt: item.createdAt, }}
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             width: "100%",
//                             textDecoration: "none",
//                             color: "inherit",
//                           }}
//                         >
//                           <FontAwesomeIcon
//                             icon={faComment}
//                             style={{ color: "#6a6b6c", marginRight: "8px" }}
//                           />
//                           <Typography>
//                             <span
//                               style={{
//                                 background:
//                                   "linear-gradient(to right, #1c59bb, #4412b9)",
//                                 WebkitBackgroundClip: "text",
//                                 WebkitTextFillColor: "transparent",
//                                 fontWeight: "bold",
//                               }}
//                             >
//                               {item?.bot?.name}
//                             </span>{" "}
//                             - {new Date(item?.createdAt).toLocaleDateString()} {new Date(item?.createdAt).toLocaleTimeString()}

//                           </Typography>
//                         </Link>
//                       </ListItem>
//                     ))}
//                   </List>
//                 </Box>
//               </Paper>
//             </Grid>
//           </Grid>
//           <Box
//             display="flex"
//             textAlign="center"
//             mt={2}
//             mb={3}
//             sx={{ marginLeft: "34%" }}
//           >
//             <Button
//               variant="contained"
//               // startIcon={<Search />}
//               sx={{
//                 backgroundColor: "#5B21B6",
//                 borderRadius: "9999px",
//                 px: 4,
//                 py: 1.5,
//                 fontWeight: "bold",
//                 fontSize: "0.875rem",
//                 "&:hover": {
//                   backgroundColor: "#4C1D95",
//                 },
//               }}
//             >
//               <i className="fas fa-chart-pie"></i> &nbsp; 分析该用户问题
//             </Button>
//           </Box>
//         </Paper>
//       </Container>
//       <Footer />
//     </>
//   );
// };

// export default ChatLogManager;




import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { History } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Header3 from "../../components/Header3";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faComments,
  faSquare,
  faSquareCheck,
  faTrashCan,
  faUser,
  faUsers,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/api/userApi";
import { RootState } from "../../redux/store";
import { fetchChatHistory } from "../../redux/chat/chatHistorySlice";
import { DeleteLogs } from "../../redux/chat/adminChathistorySlice";

const GradientHeader = styled(Box)({
  background: "linear-gradient(to right, #1c59bb, #4412b9)",
  color: "white",
  padding: "12px 5px",
  borderRadius: "10px 10px 10px 10px",
  alignItems: "center",
  fontWeight: "bold",
  height: "18vh",
});
const GradientHeader2 = styled(Box)({
  background: "linear-gradient(to right, #1c59bb, #4412b9)",
  color: "white",
  padding: "12px 20px",
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
});

const ChatLogManager: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState<any>([]);
  const [selectedLogs, setSelectedLogs] = useState<any[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<any[]>([]);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [currentFilter, setCurrentFilter] = useState<string>(""); // to show current filter label

  const store = useSelector((state: RootState) => state.user);
  const Users = store?.users || [];
  const userId = Users[0]?._id;

  const HistoryChat = useSelector((state: RootState) => state.chatHistory.chathistory);
  const chatlog = HistoryChat?.history || [];

  useEffect(() => {
    dispatch(getAllUser() as any);
  }, [dispatch, userId]);

  useEffect(() => {
    // Reset filtered logs when chatlog changes or filter changes
    if (!currentFilter) {
      setFilteredLogs(chatlog);
    }
  }, [chatlog, currentFilter]);

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    dispatch(fetchChatHistory({ userId: user._id }) as any);
    setSelectedLogs([]);
    setCurrentFilter("");
  };

  const toggleLogSelection = (index: number) => {
    setSelectedLogs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleSelectAll = () => {
    if (selectedLogs.length >= filteredLogs.length) {
      setSelectedLogs([]);
    } else {
      setSelectedLogs(filteredLogs.map((_, i) => i));
    }
  };

  const handleDeleteSelected = async () => {
    const logsToDelete = selectedLogs.map((index) => filteredLogs[index]._id);

    if (logsToDelete.length > 0) {
      await dispatch(DeleteLogs(logsToDelete) as any);
      setSelectedLogs([]);

      if (selectedUser?._id) {
        dispatch(fetchChatHistory({ userId: selectedUser._id }) as any);
        setCurrentFilter("");
      }
    }
  };

  // Filter button handlers
  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const applyFilter = (filterType: string) => {
    setCurrentFilter(filterType);
    const now = new Date();

    const filtered = chatlog.filter((log) => {
      const createdAt = new Date(log.createdAt);

      switch (filterType) {
        case "Day":
          return (
            createdAt.getDate() === now.getDate() &&
            createdAt.getMonth() === now.getMonth() &&
            createdAt.getFullYear() === now.getFullYear()
          );
        case "Week": {
          // Get first day of the current week (Sunday)
          const firstDayOfWeek = new Date(now);
          firstDayOfWeek.setDate(now.getDate() - now.getDay());
          firstDayOfWeek.setHours(0, 0, 0, 0);
          // Get last day of week (Saturday)
          const lastDayOfWeek = new Date(firstDayOfWeek);
          lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
          lastDayOfWeek.setHours(23, 59, 59, 999);

          return createdAt >= firstDayOfWeek && createdAt <= lastDayOfWeek;
        }
        case "Month":
          return (
            createdAt.getMonth() === now.getMonth() &&
            createdAt.getFullYear() === now.getFullYear()
          );
        case "Year":
          return createdAt.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });

    setFilteredLogs(filtered);
    setSelectedLogs([]);
    handleFilterClose();
  };

  return (
    <>
      <Header3 />
      <Container maxWidth="lg" sx={{ my: 5 }}>
        <Paper elevation={4} sx={{ borderRadius: 3, p: 3 }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            <FontAwesomeIcon icon={faComments} style={{ color: "#04070c" }} />
            &nbsp; 聊天记录管理
          </Typography>

          <Grid container spacing={2} minHeight={"50vh"}>
            <Grid width="25vw" sx={{ overflow: "auto" }}>
              <Paper elevation={3} sx={{ borderRadius: 2 }}>
                <GradientHeader>
                  <FontAwesomeIcon
                    icon={faUsers}
                    style={{ marginLeft: "20px", color: "#ffffff" }}
                  />{" "}
                  &nbsp; 用户列表
                  <List
                    sx={{
                      height: "65vh",
                      overflowY: "auto",
                      width: "24.7vw",
                      borderRadius: "0 0 10px 10px",
                      "&::-webkit-scrollbar": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-track": {
                        background: "transparent",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(0,0,0,0.2)",
                        borderRadius: "4px",
                      },
                      scrollbarWidth: "thin",
                      scrollbarColor: "rgba(214, 214, 214, 0.84) transparent",
                      "&:not(:hover)::-webkit-scrollbar-thumb": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {Users.map((item, index) => (
                      <ListItem
                        sx={{
                          color: "#000",
                          cursor: "pointer",
                          backgroundColor:
                            selectedUser?._id === item._id ? "#f0f0f0" : "transparent",
                          borderRadius: "0 0 10px 10px",
                          width: "100%",
                          height: "11.7vh",
                        }}
                        onClick={() => handleUserClick(item)}
                        key={index}
                      >
                        <ListItemText
                          sx={{
                            cursor: "pointer",
                            backgroundColor:
                              selectedUser?._id === item._id ? "#f0f0f0" : "transparent",
                            borderRadius: "0 0 10px 10px",
                          }}
                          onClick={() => handleUserClick(item)}
                          primary={
                            <Typography component="span">
                              <FontAwesomeIcon
                                icon={faUser}
                                style={{ color: "#233658", marginLeft: "10px" }}
                              />
                              &nbsp;
                              <Typography
                                component="span"
                                fontWeight="bold"
                                color="primary"
                                sx={{ display: "inline" }}
                              >
                                &nbsp;{item.userName}
                              </Typography>
                              <Typography
                                component="span"
                                color="text.secondary"
                                sx={{ display: "inline", ml: 1 }}
                              >
                                &nbsp;({item.email})
                              </Typography>
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </GradientHeader>
              </Paper>
            </Grid>

            {/* Chat Logs Panel */}
            <Grid width="50vw">
              <Paper elevation={1} sx={{ borderRadius: 2 }}>
                <GradientHeader2>
                  <History sx={{ mr: 1 }} /> 聊天记录列表
                </GradientHeader2>

                <Box p={2}>
                  <Box display="flex" gap={2} mb={2}>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={
                        <FontAwesomeIcon icon={faTrashCan} style={{ color: "#ffffff" }} />
                      }
                      onClick={handleDeleteSelected}
                      sx={{ borderRadius: 5 }}
                    >
                      &nbsp; 删除选中
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={
                        <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#fcfcfc" }} />
                      }
                      onClick={toggleSelectAll}
                      sx={{ borderRadius: 5, bgcolor: "Gray" }}
                      disabled={filteredLogs.length === 0}
                    >
                      &nbsp; 全选
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={
                        <FontAwesomeIcon icon={faSquare} style={{ color: "#fafafa" }} />
                      }
                      onClick={() => setSelectedLogs([])}
                      sx={{ borderRadius: 5, bgcolor: "Gray" }}
                      disabled={selectedLogs.length === 0}
                    >
                      &nbsp; 取消全选
                    </Button>

                    {/* New Filter Button */}
                    <Button
                      variant="contained"
                      startIcon={<FontAwesomeIcon icon={faFilter} style={{ color: "#fafafa" }} />}
                      onClick={handleFilterClick}
                      sx={{ borderRadius: 5, bgcolor: "Gray" }}
                      disabled={chatlog.length === 0}
                    >
                      &nbsp; 筛选: {currentFilter || "全部"}
                    </Button>

                    <Menu
                      anchorEl={filterAnchorEl}
                      open={Boolean(filterAnchorEl)}
                      onClose={handleFilterClose}
                    >
                      {["Day", "Week", "Month", "Year", "全部"].map((filter) => (
                        <MenuItem
                          key={filter}
                          onClick={() => {
                            if (filter === "全部") {
                              setFilteredLogs(chatlog);
                              setCurrentFilter("");
                            } else {
                              applyFilter(filter);
                            }
                            handleFilterClose();
                          }}
                        >
                          {filter}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>

                  <List>
                    {(filteredLogs.length > 0 ? filteredLogs : chatlog).map((item, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: "40px" }}>
                          <Checkbox
                            edge="start"
                            checked={selectedLogs.includes(index)}
                            onChange={() => toggleLogSelection(index)}
                          />
                        </ListItemIcon>

                        <Link
                          to="/chat-details"
                          state={{
                            userId: item?.userId,
                            botId: item?.botId,
                            createdAt: item.createdAt,
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            textDecoration: "none",
                            color: "inherit",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faComment}
                            style={{ color: "#6a6b6c", marginRight: "8px" }}
                          />
                          <Typography>
                            <span
                              style={{
                                background:
                                  "linear-gradient(to right, #1c59bb, #4412b9)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontWeight: "bold",
                              }}
                            >
                              {item?.bot?.name}
                            </span>{" "}
                            - {new Date(item?.createdAt).toLocaleDateString()}{" "}
                            {new Date(item?.createdAt).toLocaleTimeString()}
                          </Typography>
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Box
            display="flex"
            textAlign="center"
            mt={2}
            mb={3}
            sx={{ marginLeft: "34%" }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#5B21B6",
                borderRadius: "9999px",
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "0.875rem",
                "&:hover": {
                  backgroundColor: "#4C1D95",
                },
              }}
            >
              <i className="fas fa-chart-pie"></i> &nbsp; 分析该用户问题
            </Button>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default ChatLogManager;
