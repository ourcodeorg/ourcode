import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { NextPage } from "next";
import Link from "next/link";
import { useForm } from "@mantine/form";
import { MetaTags } from "@/components/meta";
import axios, { AxiosError } from "axios";
import { API_URL } from "@/constants";
import { notifications } from "@mantine/notifications";
import { ErrorMessage } from "@/services/error";
import { useSetUser, useUser } from "@/hooks/user";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoginRoute: NextPage = () => {
  const { username } = useUser();
  const setUser = useSetUser();
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });
  const { replace, isReady } = useRouter();
  useEffect(() => {
    if (username) replace("/");
  }, [isReady]);
  const onSubmit = async (values: typeof form.values) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, values);
      localStorage.setItem("token", res.data.token);
      setUser({ payload: res.data.user, type: "SET_USER" });
      notifications.show({
        message: `Welcome back, ${res.data.user.username}!`,
        variant: "success",
        title: "Success",
        color: "green",
      });
      replace("/");
    } catch (err: any) {
      console.log(ErrorMessage(err?.response?.data?.message));
      notifications.show({
        message: ErrorMessage(err?.response?.data?.message),
        variant: "error",
        title: "Error",
        color: "red",
      });
    }
  };

  return (
    <Container size={420} my={40}>
      <MetaTags title="Login" description="Login to your account" />
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component={Link} href="/auth/register">
          Create account
        </Anchor>
      </Text>
      <form onSubmit={form.onSubmit((data) => onSubmit(data))}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Username"
            placeholder="johndoe"
            required
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <Group position="apart" mt="lg">
            <Checkbox
              label="Remember me"
              {...form.getInputProps("rememberMe", { type: "checkbox" })}
            />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  );
};
export default LoginRoute;
