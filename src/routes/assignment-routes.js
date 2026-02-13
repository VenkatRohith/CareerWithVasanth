import { lazy } from "react";

//#region Week - 3
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
//#endregion

//#region Week-4
const Week4 = lazy(() => import("../assignments/week-4"));
const ProductResultsPage = lazy(
  () => import("../assignments/week-4/components/product-results-page"),
);

const RenderElements = lazy(
  () => import("../assignments/week-4/components/render-elements"),
);

const SearchAutoComplete = lazy(
  () => import("../assignments/week-4/components/search-autocomplete"),
);

const CacheAPIResponses = lazy(
  () => import("../assignments/week-4/components/cache-api-responses"),
);

const RoleBasedRouteGuarding = lazy(
  () => import("../assignments/week-4/components/role-based-route-guarding"),
);

const Home = lazy(
  () =>
    import("../assignments/week-4/components/role-based-route-guarding/home"),
);

const Unauthorized = lazy(
  () =>
    import("../assignments/week-4/components/role-based-route-guarding/unauthorized"),
);
const AdminPage = lazy(
  () =>
    import("../assignments/week-4/components/role-based-route-guarding/admin-page"),
);
const UserPage = lazy(
  () =>
    import("../assignments/week-4/components/role-based-route-guarding/user-page"),
);
//#endregion

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
  {
    path: "week-4",
    children: [
      { index: true, element: Week4 },
      { path: "1", element: ProductResultsPage },
      { path: "2", element: RenderElements },
      { path: "3", element: SearchAutoComplete },
      { path: "4", element: CacheAPIResponses },
      {
        path: "5",
        children: [
          {
            element: Home,
            index: true,
          },
          {
            path: "user",
            element: UserPage,
          },
          {
            path: "admin",
            element: AdminPage,
            allowedRole: "admin",
          },
          {
            path: "unauthorized",
            element: Unauthorized,
          },
        ],
      },
    ],
  },
];
