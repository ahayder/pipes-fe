import { Flex, Spacer, Text, Image, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BsFacebook, BsTwitter, BsDiscord } from "react-icons/bs";
import { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";

const MotionButton = motion(Button);

const LandingPage = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return <Dashboard />;
  } else {
    return (
      <>
        <Flex direction={"column"}>
          <Flex
            w={"100vw"}
            bgGradient="linear(to-r, cyan.500, purple.500)"
            backgroundImage={"/images/nft10.gif"}
            height={"100vh"}
            px={"10rem"}
            direction={"column"}
            alignItems={"center"}
          >
            <Image
              width={"7rem"}
              src={"assets/logo.png"}
              position={"absolute"}
              left={"1rem"}
              top={"1rem"}
            />

            <Flex width={"100%"} direction={"column"} alignItems={"center"}>
              <Text
                fontFamily={"'Press Start 2P', cursive;"}
                fontSize={"10rem"}
                fontWeight={"bold"}
                textTransform={["uppercase"]}
                letterSpacing={["-0.4rem"]}
                color={"#e1e3e5"}
                // textShadow={"-15px 5px 20px #ffffff"}
                mb={"-5rem"}
              >
                Pipes
              </Text>
              <Text
                fontFamily={"'Press Start 2P', cursive;"}
                fontSize={"10rem"}
                fontWeight={"bold"}
                textTransform={["uppercase"]}
                letterSpacing={["-0.4rem"]}
                color={"#ff0000"}
                // textShadow={"-15px 5px 20px #ff0000"}
              >
                NFT
              </Text>
            </Flex>

            <MotionButton
              // onClick={() => authenticate({ signingMessage: "Hello World!" })}
              bg={"red"}
              color={"white"}
              size={"lg"}
              mt={"2.8rem"}
              variant="solid"
              height={"5rem"}
              fontSize={"2rem"}
              width={"15rem"}
              fontWeight={"bold"}
              _hover={{ background: "ff0000" }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              textTransform={"uppercase"}
              borderBottom={"10px solid #ebebeb40"}
              boxShadow={"xl"}
              onClick={() => setShowDashboard(true)}
              fontFamily={"'Press Start 2P', cursive;"}
            >
              Enter
            </MotionButton>

            <Flex mt="2rem" fontSize={"3xl"} color="red.500">
              <BsFacebook style={{ margin: "0 0.5rem" }} />
              <BsDiscord style={{ margin: "0 0.5rem" }} />
              <BsTwitter style={{ margin: "0 0.5rem" }} />
            </Flex>
          </Flex>
        </Flex>
      </>
    );
  }
};

export default LandingPage;
