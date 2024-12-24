import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { toast } from "react-toastify";

const Kids = ({ setPageMetaData }) => {
  const [chatCount, setChatCount] = useState(
    parseInt(localStorage.getItem("chatCount") || 0)
  );

  useEffect(() => {
    // Check remaining chats on component mount
    if (chatCount >= 5) {
      toast.error(
        "You have reached the maximum number of free chats (5). Please upgrade for unlimited chats."
      );
    } else {
      toast.info(`You have ${5 - chatCount} free chats remaining.`);
    }
  }, [chatCount]);

  // Update chat count when iframe loads
  const handleIframeLoad = () => {
    const newCount = chatCount + 1;
    setChatCount(newCount);
    localStorage.setItem("chatCount", newCount.toString());
  };

  return (
    <>
      <div className="background-image main-container ">
        <Navigation />
        <div className="home-central-area">
          <iframe
            className="santa-iframe"
            allow="microphone; xr-spatial-tracking"
            src="https://eternity.ac/kids-Santa"
            onLoad={handleIframeLoad}
          />
        </div>
        <div className="home-footer">
          <div className="bottom-border" />
          <div className="bottom-text">
            &nbsp;
            <br /> &nbsp;
          </div>
        </div>
      </div>
    </>
  );
};

export default Kids;
