import { lazy } from "react";

const InSessionHome = lazy(() => import("../in-session/App"));
const InSessionDay1 = lazy(() => import("../in-session/day-1"));
const InSessionDay2 = lazy(() => import("../in-session/day-2"));

const InSessionRoutes = [
  {
    path: "in-session",
    children: [
      {
        index: true,
        element: InSessionHome,
      },
      {
        path: "day-1",
        element: InSessionDay1,
      },
      {
        path: "day-2",
        element: InSessionDay2,
      },
    ],
  },
];
