import { nanoid } from "nanoid";
import { useState } from "react";
import socket from "../utils/socket";
import { Button, Input, Tag } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@chakra-ui/react";
const Home = () => {
  const [joinCode, setJoinCode] = useState<string>("");
  const [showReceiverField, setShowReceiverField] = useState<boolean>(false); // [1
  const [receiverId, setReceiverId] = useState<string>("");
  const navigate = useNavigate();
  const toast = useToast();

  socket.on("init", (uid) => {
    setReceiverId(uid);
  });

  const createRoom = () => {
    setJoinCode(nanoid(10));
    socket.emit("sender-join", { uid: joinCode });
  };

  function showErrorToast(title: string) {
    toast({
      title: title,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
  const joinRoom = () => {
    if (!receiverId) {
      showErrorToast("Please enter a valid join code");
      return;
    }
    if (receiverId.length !== 10) {
      showErrorToast("Please enter a valid join code");
      return;
    }
    navigate(`/receiver/${receiverId}`);
  };
  return (
    <div className="flex bg-[#FDFFFC] items-center flex-col justify-center h-screen w-full">
      <div className="text-center w-[60%] mb-16">
        <h1 className="text-7xl font-bold">
          <span className="text-[#30323D]">
            Realtime File Sharing Made Simple With
          </span>{" "}
          <span className="text-[#EF2D66]">DataDrift</span>
        </h1>
        <p className="text-3xl mt-8">
          Share your files with ease using our secure and speedy file sharing
          application. Send and receive files in realtime, without the need to
          wait for emails or downloads.
        </p>
      </div>
      <div className="flex items-center justify-center w-full ">
        {!showReceiverField && (
          <Button
            bg="#EF2D66"
            size="lg"
            onClick={createRoom}
            width="10%"
            _hover={{ bg: "#EF2D66" }}
            color={"#FDFFFC"}
            margin={2}
          >
            Send
          </Button>
        )}

        {!showReceiverField ? (
          <Button
            onClick={() => setShowReceiverField(true)}
            size="lg"
            bg="#EF2D66"
            width="10%"
            _hover={{ bg: "#EF2D66" }}
            color={"#FDFFFC"}
            margin={2}
          >
            Recieve
          </Button>
        ) : (
          <motion.div
            className="w-full flex items-center justify-center"
            animate={{ opacity: [0, 1], y: [50, 0] }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Input
              variant="filled"
              placeholder="Enter join code"
              size="lg"
              width="20%"
              onChange={(e) => setReceiverId(e.target.value)}
              margin={2}
            />
            <Button
              onClick={joinRoom}
              size="lg"
              margin={2}
              bg="#EF2D66"
              width="10%"
              _hover={{ bg: "#EF2D66" }}
              color={"#FDFFFC"}
            >
              Join room
            </Button>
            <Button
              onClick={() => setShowReceiverField(false)}
              size="lg"
              colorScheme="gray"
              variant="outline"
              width="10%"
              margin={2}
            >
              Cancel
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default Home;
