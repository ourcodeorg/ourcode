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
import axios from "axios";
import { API_URL } from "@/constants";
import { notifications } from "@mantine/notifications";
import { ErrorMessage } from "@/services/error";
import { useRouter } from "next/router";

const RegisterRoute: NextPage = () => {
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      rememberMe: false,
      email: "",
    },
  });
  const { replace } = useRouter();
  const onSubmit = async (values: typeof form.values) => {
    try {
      await axios.post(`${API_URL}/auth/signup`, values);
      notifications.show({
        message: "Account created successfully",
        variant: "success",
        title: "Success",
        color: "green",
      });
      replace("/auth/login");
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
      <MetaTags title="Register" description="Create a new account" />
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
        Already have an account?{" "}
        <Anchor size="sm" component={Link} href="/auth/login">
          Login
        </Anchor>
      </Text>
      <form onSubmit={form.onSubmit((data) => onSubmit(data))}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="johndoe@mail.com"
            required
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Username"
            placeholder="johndoe"
            required
            mt="md"
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <Button fullWidth mt="xl" type="submit">
            Register
          </Button>
        </Paper>
      </form>
    </Container>
  );
};
export default RegisterRoute;
