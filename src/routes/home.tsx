import { createFileRoute, redirect } from "@tanstack/react-router";

/** `/` is the canonical home page; the old `/home` address forwards there. */
export const Route = createFileRoute("/home")({
  beforeLoad: () => {
    throw redirect({ to: "/", statusCode: 301 });
  },
});
