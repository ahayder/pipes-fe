import {
  Flex,
  Circle,
  Box,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Text,
  Button,
  useColorMode,
  SimpleGrid,
} from "@chakra-ui/react";
import Image from "next/image";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart, FiMoney } from "react-icons/fi";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";
import { useState } from "react";

// const data = {
//   isNew: true,
//   imageURL:
//     "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
//   name: "Wayfarer Classic",
//   price: 4.5,
//   rating: 4.2,
//   numReviews: 34,
// };

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1, e2, e3) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r, g, b) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

function Rating({ rating, numReviews }) {
  return (
    <Box d="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rating ? "teal.500" : "gray.300"}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && "s"}
      </Box>
    </Box>
  );
}

const NFTCard = ({ metaData, account, contractData }) => {
  const { colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick(contractData, tokenID, accountId) {
    setIsLoading(true);
    var respond = await contractData.methods
      .safeMint(accountId, tokenID)
      .send({
        from: accountId,
        value: window.web3.utils.toWei("0.03", "ether"),
      })
      .then((reponse) => {
        console.log(reponse.transactionHash);
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Minted Succesfully!",
          text: `Transaction Hash is: ${reponse.transactionHash}`,
        });
        axios
          .post(
            `https://tranquil-plains-03610.herokuapp.com/editTokenJson/${tokenID}`,
            {
              transactionHash: reponse.transactionHash,
              minted: true,
            }
          )
          .then(function (response) {
            console.log(response);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        //console.log(err.message);
        var errorMessageInJson = JSON.parse(
          err.message.slice(58, err.message.length - 2)
        );
        var errorMessageToShow =
          errorMessageInJson.data.data[
            Object.keys(errorMessageInJson.data.data)[0]
          ].reason;
        console.log(errorMessageToShow);
        if (errorMessageToShow === "ERC721: token already minted") {
          Swal.fire({
            icon: "error",
            title: "This pipe is already minted...",
          });
        }
      });
    // axios
    //   .get(`https://tranquil-plains-03610.herokuapp.com/${tokenID}`)
    //   .then((response) => {
    //     //console.log(response.data);
    //     // this.setState({
    //     //   metaData:metaData
    //     // });
    //   });
  }
  return (
    <>
      {isLoading ? (
        <Flex
          width={"100%"}
          height={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <ReactLoading type="bars" color="pink" />
        </Flex>
      ) : (
        <SimpleGrid columns={[1, 1, 2, 3]} spacing={4}>
          {metaData &&
            metaData.map((data, i) => (
              <Flex
                key={i}
                p={5}
                w="full"
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  bg={colorMode === "light" ? "white" : "gray.800"}
                  maxW="sm"
                  borderWidth="1px"
                  shadow="lg"
                  position="relative"
                >
                  {data.isNew && (
                    <Circle
                      size="10px"
                      position="absolute"
                      top={2}
                      right={2}
                      bg="red.200"
                    />
                  )}
                  <Image
                    src={data.link}
                    alt={`Picture of ${data.name}`}
                    width={355}
                    height={195}
                    style={{ borderRadius: "10px" }}
                    placeholder="blur"
                    blurDataURL={rgbDataURL(237, 181, 6)}
                  />

                  <Box p="6">
                    {/* <Box d="flex" alignItems="baseline">
                  {data.isNew && (
                    <Badge
                      rounded="full"
                      px="2"
                      fontSize="0.8em"
                      colorScheme="red"
                    >
                      New
                    </Badge>
                  )}
                </Box> */}
                    <Flex
                      mt="1"
                      justifyContent="space-between"
                      alignContent="center"
                    >
                      <Box
                        fontSize="4xl"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated
                      >
                        {`# ${i + 1}`}
                      </Box>
                      <Tooltip
                        label="Mint NFT"
                        bg="white"
                        placement={"top"}
                        color={"gray.800"}
                        fontSize={"1.2em"}
                      >
                        <Button
                          onClick={() =>
                            handleClick(
                              contractData,
                              data.counter,
                              account.accountId
                            )
                          }
                          colorScheme={"green"}
                        >
                          <Image src={"/assets/mint-button.png"} width={30} height={30} />
                          Mint NOW!
                        </Button>
                      </Tooltip>
                    </Flex>

                    <Flex justifyContent="space-between" alignContent="center">
                      {/* <Rating rating={data.rating} numReviews={data.numReviews} /> */}
                      <Box
                        fontSize="3xl"
                        color={colorMode === "light" ? "gray.800" : "white"}
                      >
                        <Box as="span" color={"gray.600"} fontSize="lg" mr={1}>
                          ETH
                        </Box>
                        0.3
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </Flex>
            ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default NFTCard;
