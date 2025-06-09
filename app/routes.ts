import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("love", "routes/love.tsx"),
] satisfies RouteConfig;
