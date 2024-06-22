"use client";

import { Box } from "@chakra-ui/react";

export default function Footer() {
  return (
    <footer className="bg-black">
      <Box
        color="white"
        display={"flex"}
        maxWidth={{ md: "100%", xl: 1160 }}
        justifyContent="end"
        alignItems="center"
        flexWrap={"wrap"}
        margin={"0 auto"}
        gap={4}
        boxSize={"border-box"}
        padding={"30px 20px"}
        position="relative"
      >
        <span className="flux">All right reserved. cho.</span>
      </Box>
    </footer>
  );
}
