import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Kid = ({ setPageMetaData, kidNumber, userId }) => {
  const navigate = useNavigate();
  const [chatCount, setChatCount] = useState(
    parseInt(localStorage.getItem("chatCount") || 0)
  );

  useEffect(() => {
    if (chatCount >= 5) {
      toast.error(
        "You have reached the maximum number of free chats (5). Please upgrade for unlimited chats."
      );
      // Redirect to pricing page after 3 seconds
      setTimeout(() => {
        navigate("/kids");
      }, 3000);
    } else {
      toast.info(`You have ${5 - chatCount} free chats remaining.`);
    }
  }, [chatCount, navigate]);

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
            src={`https://eternity.ac/Santa?clone=santa&c=santa-test&chat=true&parentUserId=${userId}&kidNumber=${kidNumber}`}
            onLoad={handleIframeLoad}
          />
        </div>
        <div className="home-footer">
          <div className="bottom-border" />
          <div className="bottom-text align-center">
            Powered by Eternity AC Inc.
          </div>
        </div>
      </div>
    </>
  );
};

export default Kid;
