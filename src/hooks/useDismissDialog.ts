import { useNavigate, useRouter } from "@tanstack/react-router";

export function useDismissDialog(fallback: "/" | "/dashboard" = "/dashboard") {
  const router = useRouter();
  const navigate = useNavigate();

  return () => {
    if (router.history.canGoBack()) {
      router.history.back();
      return;
    }
    void navigate({ to: fallback, replace: true });
  };
}
