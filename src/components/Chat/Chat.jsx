import { Divider, Grid, List, Paper, Toolbar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import "../../firebase";
import {
  child,
  get,
  getDatabase,
  onChildAdded,
  orderByChild,
  query,
  ref,
  startAt,
} from "firebase/database";

const Chat = () => {
  const { channel, user } = useSelector((state) => state);
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef();

  useEffect(() => {
    if (!channel.currentChannel) return;
    const getMessages = async () => {
      const snapShot = await get(
        child(ref(getDatabase()), "messages/" + channel.currentChannel.id)
      );
      setMessages(snapShot.val() ? Object.values(snapShot.val()) : []);
    };
    getMessages();
    return () => {
      setMessages([]);
    };
  }, [channel.currentChannel]);

  useEffect(() => {
    if (!channel.currentChannel) return;
    const sorted = query(
      ref(getDatabase(), "messages/" + channel.currentChannel.id),
      orderByChild("timestamp")
    );
    // 해당 db에 데이터가 추가되면 이벤트를 가질 수 있음
    const unsubscribe = onChildAdded(
      // 현재 시점으로 추가된 것들만 콜백을 받음
      query(sorted, startAt(Date.now())),
      (snapshot) =>
        setMessages((oldMessages) => [...oldMessages, snapshot.val()])
    );
    return () => {
      unsubscribe?.();
    };
  }, [channel.currentChannel]);

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, 2000);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [messages.length]);

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
          {messages.map((message) => (
            <ChatMessage
              key={message.timestamp}
              message={message}
              user={user}
            />
          ))}
          <div ref={messageEndRef}></div>
        </List>
        <Divider />
        <ChatInput />
      </Grid>
    </>
  );
};

export default Chat;
