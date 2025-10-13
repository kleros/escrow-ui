import { IconButton } from "components/Common/Buttons/IconButton";
import styled from "styled-components";
import Discord from "assets/discord.svg?react";
import Blog from "assets/blog.svg?react";
import Github from "assets/github.svg?react";
import LinkedIn from "assets/linkedin.svg?react";
import Telegram from "assets/telegram.svg?react";
import Twitter from "assets/twitter.svg?react";
import Youtube from "assets/youtube.svg?react";

const Container = styled.div`
  display: flex;
  gap: 8px;
`;

const defaultLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
};

const links = {
  blog: "https://blog.kleros.io/",
  discord: "https://discord.com/invite/MhXQGCyHd9",
  github: "https://github.com/kleros",
  linkedIn: "https://www.linkedin.com/company/kleros/",
  telegram: "https://t.me/kleros",
  twitter: "https://x.com/kleros_io",
  youtube: "https://www.youtube.com/@kleros_io",
};

export default function KlerosLinks() {
  return (
    <Container>
      <a href={links.github} {...defaultLinkProps}>
        <IconButton small icon={<Github />} text="" />
      </a>

      <a href={links.twitter} {...defaultLinkProps}>
        <IconButton small icon={<Twitter />} text="" />
      </a>

      <a href={links.telegram} {...defaultLinkProps}>
        <IconButton small icon={<Telegram />} text="" />
      </a>

      <a href={links.discord} {...defaultLinkProps}>
        <IconButton small icon={<Discord />} text="" />
      </a>

      <a href={links.youtube} {...defaultLinkProps}>
        <IconButton small icon={<Youtube />} text="" />
      </a>

      <a href={links.blog} {...defaultLinkProps}>
        <IconButton small icon={<Blog />} text="" />
      </a>

      <a href={links.linkedIn} {...defaultLinkProps}>
        <IconButton small icon={<LinkedIn />} text="" />
      </a>
    </Container>
  );
}
