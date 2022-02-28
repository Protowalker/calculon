import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";

export default function Index() {
  return (
    <Grid templateRows="repeat(12,1fr)" templateColumns="repeat(12,1fr)">
      <GridItem
        rowSpan={2}
        colSpan={12}
        boxShadow="md"
        p=".5em"
        bgColor="purple.400"
      >
        <Flex justifyContent="center" alignItems="center">
          <Heading color="white">CALCULON</Heading>
        </Flex>
      </GridItem>
    </Grid>
  );
}
