import { useUser } from "@/hooks/user";
import {
  createStyles,
  Header as MantineHeader,
  Container,
  Burger,
  rem,
  Avatar,
  Group,
  Button,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { classes, cx } = useStyles();
  const { username } = useUser();

  return (
    <MantineHeader height={HEADER_HEIGHT} mb={120} className={classes.root}>
      <div className={classes.header}>
        <Link href="/">
          <Avatar size={50} src={"/logo.png"} radius={"md"} />
        </Link>
        {username ? (
          <>
            <Text>{username}</Text>
          </>
        ) : (
          <Group>
            <Link href="/auth/login">
              <Button variant="outline" radius={"xl"} color="green">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline" radius={"xl"} color="green">
                Register
              </Button>
            </Link>
          </Group>
        )}
        {/* <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        /> */}
      </div>
    </MantineHeader>
  );
}
