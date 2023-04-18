import { AppProps } from "next/app";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useState } from "react";
import { Header } from "@/components/header";
import { outfit } from "@/fonts";
import { Notifications } from "@mantine/notifications";
import { RouterTransition } from "@/components/router";
import { UserProvider } from "@/context/user";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (s?: ColorScheme) => {
    setColorScheme(s || colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <UserProvider>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            fontFamily: outfit.style.fontFamily,
          }}
        >
          <Header />
          <RouterTransition />
          <Notifications />
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </UserProvider>
  );
}
