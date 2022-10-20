import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Calculator, Prisma, User } from "@prisma/client";
import { Link, LoaderFunction, redirect, useLoaderData } from "remix";
import HamburgerMenu from "~/components/HamburgerMenu";
import { db } from "~/util/db.server";

export const loader: LoaderFunction = async (args) => {
  const calculators = await db.calculator.findMany({
    include: { author: true },
  });
  return calculators;
};

export default function Calculon() {
  const calculators = useLoaderData<(Calculator & { author: User })[]>();
  return (<>
    <HamburgerMenu>
    </HamburgerMenu>
    <SimpleGrid columns={6} spacing="10">
      {calculators.map((v, i) => (
        <GridItem
          key={i}
          display="flex"
          flexDirection="column"
          alignItems="center"
          shadow="md"
          bgColor="gray.50"
        >
          <Link to={`/calculon/${v.author.username}/${v.slug}`}>
            {v.displayName}
          </Link>
          <Text color="gray.500"> by {v.author.username}</Text>
        </GridItem>
      ))}
    </SimpleGrid>
  </>
  );
}
