import "jose";
import { UserToken } from "./user";

declare module "jose" {
  export interface JWTPayload extends UserToken {}
}
