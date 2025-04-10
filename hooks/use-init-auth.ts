import { useAuthStore } from "@/lib/store";
import { useEffect } from "react";

export const useInitAuth = () => {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);
};
