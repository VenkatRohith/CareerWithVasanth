import { lazy } from "react";

const InSession = lazy(() => import("../in-session"));
const BoxDecolouring = lazy(() => import("../in-session/box-decoloring"));
const TrafficLight = lazy(() => import("../in-session/traffic-light"));
const MultipleButton = lazy(() => import("../in-session/multiple-button"));
const LargeListDemo = lazy(() => import("../in-session/large-list-demo"));

export const inSessionRoutes = [
  /* {
    path:
  }, */
  {
    children: [
      {
        index: true,
        element: InSession,
      },
      {
        path: "week-2",
        element: MultipleButton,
      },
      {
        path: "week-3",
        element: TrafficLight,
      },
      {
        path: "week-4",
        element: LargeListDemo,
      },
      {
        path: "week-5",
        element: BoxDecolouring,
      },
    ],
  },
];
