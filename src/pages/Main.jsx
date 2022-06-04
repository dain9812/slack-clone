import { Box, Drawer, Toolbar } from "@mui/material";
import ChannelMenu from "../components/ChannelMenu";
import Header from "../components/Header";

const Main = () => {
  return (
    <Box sx={{ display: "flex", backgroundColor: "white" }}>
      <Header />
      <Drawer variant="permanent" sx={{ width: 300 }} className="no-scroll">
        <Toolbar />
        <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
          <ChannelMenu />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Main;
