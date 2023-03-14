import React from "react";
import ChatList from "../components/ChatList";
import Search from "../components/Search";
import Status from "../components/Status";
import TopNav from "../components/TopNav";

function ChatHome() {
  return (
    <div className="noScroll">
      <div className="chatContainer">
        <TopNav />
        {/* <Status /> */}
        <Search />
        <ChatList />
      </div>
    </div>
  );
}

export default ChatHome;
