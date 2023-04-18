import { Sen, Outfit } from "next/font/google";

export const outfit = Outfit({
  display: "swap",
  subsets: ["latin"],
});

export const sen = Sen({
  weight: ["400", "700", "800"],
  display: "swap",
  subsets: ["latin", "latin-ext"],
});
