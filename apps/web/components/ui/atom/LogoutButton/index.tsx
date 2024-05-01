import { useCallback } from "react";
import { Button } from "@chakra-ui/react";
import useUserMutation from "hooks/mutation/useUserMutation";

export default function LogoutButton() {
  const { signOutUserMutation } = useUserMutation();

  const handleClickLogout = useCallback(() => {
    signOutUserMutation.mutate();
  }, []);

  return <Button onClick={handleClickLogout}>Logout</Button>;
}
