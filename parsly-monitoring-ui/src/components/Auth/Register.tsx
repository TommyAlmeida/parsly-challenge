import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { SchemaOf, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { AuthInputData } from "../../api/services/Auth/Types";
import { register } from "../../api/services/Auth/AuthService";
import { navigate } from "gatsby";

export default function Register() {
  const resolver = yupResolver(
    object().shape({
      email: string().email().defined().required(),
      password: string()
        .defined()
        .required()
        .min(8, "Password must be longer than or equal to 8 characters"),
    }) as SchemaOf<AuthInputData>
  );

  const form = useForm<AuthInputData>({
    resolver,
    reValidateMode: "onSubmit",
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  const handleRegister = async (values: AuthInputData) => {
    try {
      const { email, password } = values;

      console.log(email, password);
      const response = await register({ email, password });

      localStorage.setItem("accessToken", response["accessToken"]);
      navigate("/dashboard");
    } catch (err) {
      console.log("handleRegister error: ", err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/dashboard");
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Sign up
        </Heading>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={4}>
          <form onSubmit={form.handleSubmit(handleRegister)}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input type="email" {...form.register("email")} required />
            </FormControl>
            <FormControl id="password" pt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  {...form.register("password")}
                  required
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword(showPassword => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
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
                Sign up
              </Button>
            </Stack>
          </form>
          <Stack pt={4}>
            <Text align={"center"}>
              Already a user?{" "}
              <Link href="/login" color={"gray.400"}>
                Login
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
