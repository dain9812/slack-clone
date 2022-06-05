import { Divider, Grid, List, Paper, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

const Chat = () => {
  const { channel } = useSelector((state) => state);

  return (
    <>
      <Toolbar />
      <ChatHeader channelInfo={channel.currentChannel} />
      <Grid
        container
        component={Paper}
        variant="outlined"
        sx={{ mt: 3, position: "relative" }}
      >
        <List
          sx={{
            height: "calc(100vh - 350px)",
            overflow: "auto",
            width: "100%",
            position: "relative",
          }}
        >
          {/* 채팅메세지 */}
        </List>
        <Divider />
        <ChatInput />
      </Grid>
    </>
  );
};

export default Chat;
