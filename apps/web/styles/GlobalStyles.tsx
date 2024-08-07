"use client";
import React from "react";
import { createGlobalStyle } from "styled-components";
import tw, { GlobalStyles as BaseStyles } from "twin.macro";

const CustomStyles = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }

    body {
        font-family: "Helvetica", "Arial", sans-serif;
        line-height: 1.5;
    }
`;

const GlobalStyles = () => (
  <>
    <CustomStyles />
  </>
);

export default GlobalStyles;
