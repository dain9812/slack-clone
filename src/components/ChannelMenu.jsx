import {
  List,
  ListItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState, useCallback, useEffect } from "react";
import "../firebase";
import {
  child,
  getDatabase,
  onChildAdded,
  push,
  ref,
  update,
} from "@firebase/database";

const ChannelMenu = () => {
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelDetail, setChannelDetail] = useState("");
  const [channels, setChannels] = useState([]);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const unsubscribe = onChildAdded(
      ref(getDatabase(), "channels"),
      (snapshot) => {
        setChannels((channelArr) => [...channelArr, snapshot.val()]);
      }
    );
    return () => {
      setChannels([]);
      unsubscribe();
    };
  }, []);

  const handleSubmit = useCallback(async () => {
    const db = getDatabase();
    const key = push(child(ref(db), "channels")).key;
    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetail,
    };
    const updates = {};
    updates["/channels/" + key] = newChannel;

    try {
      await update(ref(db), updates);
      setChannelName("");
      setChannelDetail("");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }, [channelDetail, channelName]);

  return (
    <>
      <List sx={{ overflow: "auto", width: 240, backgroundColor: "#4c3c4c" }}>
        <ListItem
          secondaryAction={
            <IconButton sx={{ color: "#9a939b" }} onClick={handleClickOpen}>
              <AddIcon />
            </IconButton>
          }
        >
          <ListItemIcon sx={{ color: "9a939b" }}>
            <ArrowDropDownIcon />
          </ListItemIcon>
          <ListItemText
            primary="채널"
            sx={{ wordBreak: "break-all", color: "#9a939b" }}
          />
        </ListItem>
        <List component="div" disablePadding sx={{ pl: 3 }}>
          {channels.map((channel) => (
            <ListItem button key={channel.id}>
              <ListItemText
                primary={`# ${channel.name}`}
                sx={{ wordBreak: "break-all", color: "#918890" }}
              />
            </ListItem>
          ))}
        </List>
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>채널 추가</DialogTitle>
        <DialogContent>
          <DialogContentText>
            생성할 채널명과 설명을 입력해주세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="채널명"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setChannelName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="설명"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setChannelDetail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleSubmit}>생성</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChannelMenu;
