import {
  Avatar,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

const ChatMessage = () => {
  return (
    <ListItem>
      <ListItemAvatar sx={{ alignSelf: "stretch" }}>
        <Avatar
          variant="rounded"
          sx={{ width: 50, height: 50 }}
          alt="profile image"
        />
      </ListItemAvatar>
      <Grid container sx={{ ml: 2 }}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "left" }}>
          <ListItemText
            sx={{ display: "flex" }}
            primary={"닉네임"}
            primaryTypographyProps={{ fontWeight: "bold", color: "orange" }}
            secondary={"2022.06.06"}
            secondaryTypographyProps={{ color: "gray", ml: 1 }}
          />
        </Grid>
        <Grid item xs={12}>
          <ListItemText
            align="left"
            xs={{ wordBreak: "break-all" }}
            primary={"채팅메세지입니다."}
          />
          {/* <img alt="message" src="" style={{ maxWidth: "100%" }} /> */}
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default ChatMessage;
