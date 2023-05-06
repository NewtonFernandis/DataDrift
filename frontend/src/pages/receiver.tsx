import { useState } from "react";
import { Button, Input } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import socket from "../utils/socket";
const Receiver = () => {
  const [senderId, setSenderId] = useState<string>("");

  const joinRoom = () => {
    if (!senderId) return;

    let joinId = nanoid(10);
    socket.emit("receiver-join", { uid: joinId, sender_uid: senderId });
  };
  return <></>;
};

export default Receiver;
