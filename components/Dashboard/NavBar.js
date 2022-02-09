import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { injected } from "../connector";

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await activate(injected);
          localStorage.setItem("isWalletConnected", true);
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

  async function connect() {
    console.log("connecting");
    try {
      await activate(injected);
      localStorage.setItem("isWalletConnected", true);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", false);
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <Flex
      bg={useColorModeValue("white", "gray.900")}
      h={16}
      alignItems={"center"}
      justifyContent={"end"}
      px={"6"}
      borderBottom="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Flex alignItems={"center"}>
        <Stack direction={"row"} spacing={7}>
          <Menu>
            {active ? (
              <MenuButton
                onClick={connect}
                bgColor={"green.400"}
                color={"white"}
                padding={"0.5rem"}
                borderRadius={"full"}
              >
                Connected with:{" "}
                {account.substring(0, 5) + " ... " + account.slice(-4)}
              </MenuButton>
            ) : (
              <MenuButton
                onClick={connect}
                bgColor={"green.400"}
                color={"white"}
                padding={"0.5rem"}
                borderRadius={"full"}
              >
                Connect Wallet
              </MenuButton>
            )}
            <MenuList>
              <MenuItem
                onClick={disconnect}
                bgColor={"red.500"}
                color={"white"}
                padding={"0.5rem"}
                borderRadius={"full"}
              >
                Disconnect Wallet
              </MenuItem>
            </MenuList>
          </Menu>
          {/* {active ? (
            <Button onClick={connect} colorScheme={"green"} variant={"solid"}>
              Connected with:{" "}
              {account.substring(0, 5) + " ... " + account.slice(-4)}
            </Button>
          ) : (
            <Button onClick={connect} colorScheme={"green"} variant={"solid"}>
              Connect Wallet
            </Button>
          )} */}
          <Button onClick={toggleColorMode} borderRadius={"full"}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>

          {/* <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar
                size={"sm"}
                src={"https://avatars.dicebear.com/api/male/username.svg"}
              />
            </MenuButton>
            <MenuList alignItems={"center"}>
              <br />
              <Center>
                <Avatar
                  size={"2xl"}
                  src={"https://avatars.dicebear.com/api/male/username.svg"}
                />
              </Center>
              <br />
              <Center>
                <p>Username</p>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem>Your Servers</MenuItem>
              <MenuItem>Account Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu> */}
        </Stack>
      </Flex>
    </Flex>
  );
}
