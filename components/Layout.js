import { Flex } from "@chakra-ui/react";

export const Layout = ({ children }) => {
  return (
    <Flex
      height="100vh"
      direction="column"
      justifyContent="space-between"
      alignItems="center"
    >
      {children}
    </Flex>
  );
};
