import "next-auth";
import { User as UserInterface } from "./user";

declare module "next-auth/jwt" {
  interface JWT {
    // 위 코드예시에서 name과 email을 보낸것들에 대한 값에 대해 타입설정을 해준다
    user?: {
      username: string;
    };
  }
}

declare module "next-auth" {
  interface User extends UserInterface {}
  interface AdapterUser extends UserInterface {}
  interface Session {
    user?: UserInterface;
  }
}
