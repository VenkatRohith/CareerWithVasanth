/*

5th Question - Uber

Implement a role-based route guarding system using React Router.

Some routes should be public while others require authentication and specific roles
(e.g., admin or user).

Unauthorized users should be redirected appropriately, and
loading states should be handled during auth checks.

Example: A non-admin user attempting to access /admin is redirected to /login
or /unauthorized.
*/

import { Navigate } from "react-router";

export default function RoleBasedRouteGuarding({
  allowedRole = "user",
  children,
}) {
  const userRole = sessionStorage.getItem("role"); //usually this comes from API

  if (allowedRole !== userRole)
    return <Navigate to="/assignments/week-4/5/unauthorized" />;

  return <>{children}</>;
}

/*
1st Attempt - 1hr 10min

Stuck on how to restrict the route. Initially tried one
approach, but that didn't work

Took help of Gen AI on how to restrict and
understood that we can use HigherOrderComponent (HOC)
pattern here to protect the routes.

Implemented then using HOC pattern and
also refered React Router documentation
for Navigate
*/
