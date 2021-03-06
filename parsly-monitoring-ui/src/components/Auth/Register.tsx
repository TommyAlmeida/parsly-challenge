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
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { SchemaOf, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { AuthInputData } from "../../api/services/Auth/Types";
import { register } from "../../api/services/Auth/AuthService";
import { navigate } from "gatsby";

export default function Register() {
  const toast = useToast();

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

  const handleRegister = async (values: AuthInputData) => {
    try {
      const { email, password } = values;
      await register({ email, password })
        .then(() => {
          toast({
            title: "Success",
            description: "You're account has been created.",
            position: "top",
            status: "success",
            variant: "solid",
            isClosable: true,
          });
          navigate("/login");
        })
        .catch(e => {
          const errors = e.response.data;
          console.log(errors);
          toast({
            title: errors.error,
            description: errors.message,
            position: "top",
            status: "error",
            variant: "solid",
            isClosable: true,
          });
        });
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
            <FormErrorMessage>
              {form.formState.errors && (
                <Text role="alert">Error: {form.formState.errors}</Text>
              )}
            </FormErrorMessage>
            <FormControl isInvalid={form.formState.errors.email}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" {...form.register("email")} required />
            </FormControl>
            <FormControl
              id="password"
              pt={4}
              isInvalid={form.formState.errors.password}
              isRequired
            >
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
