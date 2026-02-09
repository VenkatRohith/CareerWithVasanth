import { lazy } from "react";

const Week3 = lazy(() => import("../assignments/week-3"));
const RealTimeUI = lazy(
  () => import("../assignments/week-3/components/realtime-ui"),
);
const DOMInteraction = lazy(
  () => import("../assignments/week-3/components/dom-interaction"),
);
const CustomHooks = lazy(
  () => import("../assignments/week-3/components/custom-hooks"),
);
const StateManagement = lazy(
  () => import("../assignments/week-3/components/state-management"),
);
const CustomHooks2 = lazy(
  () => import("../assignments/week-3/components/custom-hooks-2"),
);
const GeneralMachineCoding1 = lazy(
  () => import("../assignments/week-3/components/general-machine-coding-1"),
);
const GeneralMachineCoding2 = lazy(
  () => import("../assignments/week-3/components/general-machine-coding-2"),
);

const Week4 = lazy(() => import("../assignments/week-4"));

// Export component references (not JSX) so this module contains plain JS values
export const assignmentRoutes = [
  {
    path: "week-3",
    children: [
      {
        index: true,
        element: Week3,
      },
      {
        path: "1",
        element: RealTimeUI,
      },
      {
        path: "2",
        element: DOMInteraction,
      },
      {
        path: "3",
        element: CustomHooks,
      },
      {
        path: "4",
        element: StateManagement,
      },
      {
        path: "5",
        element: CustomHooks2,
      },
      {
        path: "6",
        element: GeneralMachineCoding1,
      },
      {
        path: "7",
        element: GeneralMachineCoding2,
      },
    ],
  },
  { path: "week-4", children: [{ index: true, element: Week4 }] },
];
