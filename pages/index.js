import { Flex } from "@chakra-ui/react";
import LandingPage from "../components/LandingPage/LandingPage";
import Head from "next/head";

export default function Home() {
  return (
    <>
    <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Flex>
        <LandingPage />
      </Flex>
    </>
  );
}
