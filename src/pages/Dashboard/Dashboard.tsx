import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Input,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchBots, deleteBot } from "../../redux/bot/boat";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

const cardStyle = {
  borderRadius: 4,
  overflow: "hidden",
  boxShadow: 3,
  display: "flex",
  flexDirection: "column",
  height: "100%",
  boxSizing: "border-box",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
  },
  width: "100%",
  maxWidth: "350px",
};

const buttonStyle = {
  borderRadius: 50,
  textTransform: "none",
  fontWeight: 500,
  alignSelf: "center",
};

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const botsFromStore = useSelector((state: any) => state.bots.bots);
  const [bots, setBots] = useState<any[]>([]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBot, setSelectedBot] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [formData, setFormData] = useState({
    Name: "",
    description: "",
    avatar: "",
    rgb: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);

  useEffect(() => {
    dispatch(fetchBots());
  }, [dispatch]);

  useEffect(() => {
    if (botsFromStore) {
      setBots(botsFromStore);
    }
  }, [botsFromStore]);

  const storedUserStr = localStorage.getItem("User");
  let User: any;
  if (storedUserStr) {
    const storedUser = JSON.parse(storedUserStr);
    User = storedUser;
  }

  const handleUpdate = async () => {
    if (!selectedBot) return;

    const formDataToUpload = new FormData();
    formDataToUpload.append("Name", formData.Name);
    formDataToUpload.append("description", formData.description);
    formDataToUpload.append("rgb", formData.rgb);

    if (profileImage) {
      formDataToUpload.append("avatar", profileImage);
    }

    try {
      const response = await fetch(
        `http://38.242.230.126:5476/Bot/update/${selectedBot._id}`,
        {
          method: "PUT",
          body: formDataToUpload,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update bot");
      }

      await dispatch(fetchBots());
      setOpenDialog(false);
    } catch (err) {
      console.error("Failed to update bot", err);
    }
  };

  const handleDelete = async () => {
    if (!selectedBot) return;
    try {
      await dispatch(deleteBot({ botId: selectedBot._id }));
      setOpenDeleteDialog(false);
    } catch (err) {
      console.error("Failed to delete bot", err);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfileImage(event.target.files[0]);
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const newBots = Array.from(bots);
    const [movedBot] = newBots.splice(result.source.index, 1);
    newBots.splice(result.destination.index, 0, movedBot);
    setBots(newBots);
  };

  return (
    <>
      <Header />
      <Container sx={{ p: 4, maxWidth: "1200px" }}>
        <Typography variant="h4" align="center" sx={{ my: 4 }}>
          我的機器人區
        </Typography>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="botsDroppable" direction="horizontal">
            {(provided) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    md: "1fr 1fr 1fr",
                  },
                  gap: 3,
                  justifyContent: "center",
                }}
              >
                {bots && bots.length > 0 ? (
                  bots.map((bot: any, index: number) => (
                    <Draggable
                      key={bot._id}
                      draggableId={bot._id}
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Card sx={cardStyle}>
                            <Box
                              sx={{
                                background: bot.rgb,
                                p: 2,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                              }}
                            >
                              <img
                                src={`http://38.242.230.126:5476/${bot.avatar}`}
                                alt="Bot Avatar"
                                style={{ height: "40px" }}
                              />
                              {User?.data?.role === "admin" && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                  }}
                                >
                                  <IconButton
                                    onClick={(e) => {
                                      setAnchorEl(e.currentTarget);
                                      setSelectedBot(bot);
                                      setFormData({
                                        Name: bot.Name,
                                        description: bot.description,
                                        avatar: bot.avatar,
                                        rgb: bot.rgb,
                                      });
                                    }}
                                    size="small"
                                  >
                                    <MoreVertIcon sx={{ color: "white" }} />
                                  </IconButton>
                                </Box>
                              )}
                            </Box>

                            <CardContent
                              sx={{
                                textAlign: "start",
                                flexGrow: 1,
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Typography
                                variant="h6"
                                fontWeight="bold"
                                gutterBottom
                              >
                                {bot.Name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 3, flexGrow: 1 }}
                              >
                                {bot.description}
                              </Typography>

                              <Button
                                disabled={
                                  bot._id === "6811f246a6c400d4913dd5a0"
                                }
                                component={Link}
                                to={`/search/${bot._id}`}
                                variant="contained"
                                sx={{
                                  ...buttonStyle,
                                  backgroundColor: bot.rgb,
                                  "&:hover": {
                                    opacity: 0.9,
                                  },
                                  width: "100%",
                                }}
                              >
                                開始使用
                              </Button>
                            </CardContent>
                          </Card>
                        </Box>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <Typography
                    variant="h6"
                    align="center"
                    color="text.secondary"
                  >
                    暫無機器人
                  </Typography>
                )}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Container>

      <Footer />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setOpenDialog(true);
            setAnchorEl(null);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenDeleteDialog(true);
            setAnchorEl(null);
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Bot</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Name"
            value={formData.Name}
            onChange={(e) =>
              setFormData({ ...formData, Name: e.target.value })
            }
          />
          <TextField
            label="Description"
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <TextField
            label="RGB"
            type="color"
            value={formData.rgb}
            onChange={(e) =>
              setFormData({ ...formData, rgb: e.target.value })
            }
          />
          <Input
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={handleFileChange}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Are you sure you want to delete this bot?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleDelete}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;



