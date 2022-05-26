import { Center } from "@chakra-ui/react";
import { ActionFunction, redirect } from "remix";
import { Box, Button, Flex, Input, VStack } from "@chakra-ui/react";
import { Form } from "remix";

export type Destination = "home" | `${string}/${string}`;

export function LoginBox(props: { destination: Destination }) {
  return (
    <Flex shadow="lg" minHeight="30%" justify="center">
      <Form method="post" action="/login">
        <input type="hidden" value={props.destination} name="destination" />
        <Flex
          height="100%"
          padding="1em"
          direction="column"
          justify="space-between"
        >
          <VStack>
            <Input placeholder="Username" name="username" />
            <Input placeholder="Password" type="password" name="password" />
          </VStack>
          <Button type="submit">Log in</Button>
        </Flex>
      </Form>
    </Flex>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();

  // Go to home page if there's no destination
  if (data.get("destination") === "home") return redirect("/calculon");
  else return redirect(`/calculon/${data.get("destination")}`);
};

export default function LoginPage() {
  return (
    <Center height="100vh">
      <LoginBox destination="home" />
    </Center>
  );
}
