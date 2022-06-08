import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import InsertEmotionIcon from "@mui/icons-material/InsertEmoticon";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";
import { useState, useCallback } from "react";
import "../../firebase";
import {
  getDatabase,
  push,
  ref,
  serverTimestamp,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const ChatInput = () => {
  const { channel, user } = useSelector((state) => state);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const handleTogglePicker = useCallback(
    () => setShowEmoji((show) => !show),
    []
  );

  const handleChange = useCallback((e) => setMessage(e.target.value), []);

  const createMessage = useCallback(
    () => ({
      timestamp: serverTimestamp(),
      user: {
        id: user.currentUser.uid,
        name: user.currentUser.displayName,
        avatar: user.currentUser.photoURL,
      },
      content: message,
    }),
    [
      message,
      user.currentUser.uid,
      user.currentUser.displayName,
      user.currentUser.photoURL,
    ]
  );

  const clickSendMessage = useCallback(async () => {
    if (!message) return;
    setLoading(true);
    try {
      await set(
        push(ref(getDatabase(), "messages/" + channel.currentChannel.id)),
        createMessage()
      );
      setLoading(false);
      setMessage("");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [message, channel.currentChannel?.id, createMessage]);

  const handleSelectEmoji = useCallback((e) => {
    const sym = e.unified.split("-");
    const codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    setMessage((messageValue) => messageValue + emoji);
  }, []);

  return (
    <Grid container sx={{ p: "20px" }}>
      <Grid item xs={12} sx={{ position: "relative" }}>
        {showEmoji && (
          <Picker
            set="apple"
            className="emojipicker"
            title="이모지를 선택하세요."
            onSelect={handleSelectEmoji}
            emoji="point_up"
            style={{ position: "absolute", bottom: "80px" }}
          />
        )}
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleTogglePicker}>
                  <InsertEmotionIcon />
                </IconButton>
                <IconButton>
                  <ImageIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start">
                <IconButton disabled={loading} onClick={clickSendMessage}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="메세지 입력"
          fullWidth
          autoComplete="off"
          value={message}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default ChatInput;
