import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import "@fontsource/press-start-2p";

function getLibrary(provider) {
  return new Web3(provider);
}

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Layout>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Component {...pageProps} />
        </Web3ReactProvider>
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
