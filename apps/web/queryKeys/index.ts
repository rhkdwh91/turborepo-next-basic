import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import postsKeys from "./postsKeys";

import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

export const getQueryClient = cache(() => new QueryClient());
export const queryKeys = mergeQueryKeys(postsKeys);
