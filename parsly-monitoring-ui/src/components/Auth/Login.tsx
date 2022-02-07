import React, { useEffect } from "react";
import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Text,
  Link,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { SchemaOf, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthInputData } from "../../api/services/Auth/Types";
import { login } from "../../api/services/Auth/AuthService";
import { navigate } from "gatsby";

const Login = () => {
  const resolver = yupResolver(
    object().shape({
      email: string().email().defined().required(),
      password: string().defined().required(),
    }) as SchemaOf<AuthInputData>
  );

  const form = useForm<AuthInputData>({
    resolver,
    reValidateMode: "onSubmit",
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  const handleLogin = async (values: AuthInputData) => {
    try {
      const { email, password } = values;
      const response = await login({ email, password });

      if (!response["accessToken"]) {
        throw new Error("AccessToken could not be set.");
      }

      localStorage.setItem("accessToken", response["accessToken"]);
      navigate("/dashboard");
    } catch (err) {
      console.log("handleLogin error: ", err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <Flex
        minH={"90vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <form onSubmit={form.handleSubmit(handleLogin)}>
                <FormErrorMessage>{form.formState.errors}</FormErrorMessage>
                <FormControl id="email" isInvalid={form.formState.errors.email}>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" {...form.register("email")} />
                </FormControl>
                <FormControl
                  id="password"
                  pt={4}
                  isInvalid={form.formState.errors.password}
                >
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...form.register("password")} />
                </FormControl>
                <Stack spacing={10} pt={6}>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Stack>
              </form>
            </Stack>
            <Stack pt={4}>
              <Text align={"center"}>
                Not yet a user?{" "}
                <Link href="/register" color={"gray.400"}>
                  Register
                </Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Login;
