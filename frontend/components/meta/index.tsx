import Head from "next/head";
import { FC } from "react";

interface MetaTagsProps {
  title: string;
  description: string;
  ogImage?: string;
}

const MetaTags: FC<MetaTagsProps> = ({ description, title, ogImage }) => {
  return (
    <Head>
      <>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <link rel="icon" href="/logo.png" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ourcode.com" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage || "/logo.png"} />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ourcode.com" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={ogImage || "/logo.png"} />
      </>
    </Head>
  );
};

export { MetaTags };
