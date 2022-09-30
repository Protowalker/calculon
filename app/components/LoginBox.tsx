import React, { useState } from "react";
import { useEffect } from "react";
import { useFetcher } from "remix";

import { Alert, AlertIcon, AlertTitle, Center } from "@chakra-ui/react";
import { Box, Button, Flex, Input, VStack } from "@chakra-ui/react";
import { LoginResponseData } from "~/routes/login";



export function LoginBox(props: {onSuccess: (() => void) }) {
    const fetcher = useFetcher();
    const [data, setData] = useState(fetcher.data as LoginResponseData);

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
        <fetcher.Form method="post" action="/login">
          <Flex
            height="100%"
            padding="1em"
            direction="column"
            justify="space-between"
          >
            <VStack>
              <Input placeholder="Username" name="username" />
              <Input placeholder="Password" type="password" name="password" />
              {data?.type == "error" ?<Alert status="error">
                <AlertIcon />
                <AlertTitle>{data?.message}</AlertTitle>
              </Alert> : null}
            </VStack>
            <Button type="submit">Log in</Button>
          </Flex>
        </fetcher.Form>
      </Flex>
    );
  }