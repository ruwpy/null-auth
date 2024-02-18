import { Navigate, createFileRoute } from "@tanstack/react-router";

const RootIndex = () => {
  return <div>main</div>;
};

export const Route = createFileRoute("/")({
  component: RootIndex,
});
