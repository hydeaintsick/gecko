import { useAuthStore } from "@/lib/store";
import { useEffect } from "react";

export const useInitAuth = () => {
  // @ts-expect-error
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);
};
