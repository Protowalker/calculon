import { GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { Calculator, User } from "@prisma/client";
import { json, Link, LoaderFunction, useLoaderData } from "remix";
import {db} from "~/util/db.server";

export const loader = async (args: Parameters<LoaderFunction>[0]) => {
    const username = args.params.username;

    const calcs = await db.calculator.findMany({where: {author: {username: username}}, include: {author: true} });

    return json(calcs);
};

export default function UserCalculatorList() {
    const calculators = useLoaderData<(Calculator & {author: User})[]>();

    return (
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
    )
}