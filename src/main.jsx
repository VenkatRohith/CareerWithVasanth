import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router";
import { assignmentRoutes } from "./routes/assignment-routes";

const App = lazy(() => import("./App"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<App />} />
          <Route path="assignments">
            {assignmentRoutes.map((route) => (
              <Route key={route.path} path={route.path}>
                {route.children.map((child) =>
                  child.index ? (
                    <Route
                      index
                      key={`${route.path}-index`}
                      element={<child.element />}
                    />
                  ) : (
                    <Route
                      key={`${route.path}-${child.path}`}
                      path={child.path}
                      element={<child.element />}
                    />
                  ),
                )}
              </Route>
            ))}
          </Route>
          {/* <Route path="in-session">
            {inSessionRoutes.map((route) => (
              <Route key={route.path || "index"} {...route} />
            ))}
          </Route> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);
