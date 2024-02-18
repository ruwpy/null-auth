import { Link, createFileRoute } from "@tanstack/react-router";

const NotFound = () => {
  return <Link to="/">домйо</Link>;
};

export const Route = createFileRoute("/__404")({
  component: NotFound,
});
