"use client";

import { Box } from "@chakra-ui/react";
import styles from "./styles.module.css";

export default function Footer() {
  return (
    <footer>
      <Box
        color="black"
        display={"flex"}
        maxWidth={{ md: "100%", xl: 1160 }}
        alignItems="center"
        flexWrap={"wrap"}
        margin={"0 auto"}
        gap={4}
        boxSize={"border-box"}
        padding={"100px 20px 70px 20px"}
        position="relative"
      >
        <span className={styles.footer_text}>All right reserved. cho.</span>
      </Box>
    </footer>
  );
}
