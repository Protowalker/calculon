import { useFetcher } from "remix";
import {useState, useEffect} from "react";
import {Button, Flex, Input, VStack} from "@chakra-ui/react";
import { RegisterResponseData } from "~/routes/register";

export function RegisterBox(props: {onSuccess: (() => void)}) {
    const fetcher = useFetcher();
    const [data, setData] = useState(fetcher.data as RegisterResponseData);

    useEffect(() => {
        console.log(fetcher);
        if(fetcher.state==="loading")
            setData(fetcher.data);
    }, [fetcher.data]);



    useEffect(() => {
        if(fetcher.state === "idle" && fetcher.type === "done" &&  fetcher.data.type==="success")
            props.onSuccess();
    }, [fetcher]);
    
    return (
      <Flex shadow="lg" minHeight="30%" justify="center">
        <fetcher.Form method="post" action="/register">
          <Flex
            height="100%"
            padding="1em"
            direction="column"
            justify="space-between"
          >
            <VStack>
              <Input placeholder="Username" name="username" />
              <Input placeholder="Email" name="email" />
              <Input placeholder="Password" type="password" name="password" />
              <Input placeholder="Confirm Password" type="password" name="confirm password" />
            </VStack>
            <Button type="submit">Register</Button>
          </Flex>
        </fetcher.Form>
      </Flex>
    );
  }