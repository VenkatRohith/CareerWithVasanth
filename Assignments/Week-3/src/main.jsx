import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router";

const App = lazy(() => import("./App"));
const RealTimeUI = lazy(() => import("./components/realtime-ui"));
const DOMInteraction = lazy(() => import("./components/dom-interaction"));
const CustomHooks = lazy(() => import("./components/custom-hooks"));
const StateManagement = lazy(() => import("./components/state-management"));
const CustomHooks2 = lazy(() => import("./components/custom-hooks-2"));
const GeneralMachineCoding1 = lazy(
  () => import("./components/general-machine-coding-1"),
);
const GeneralMachineCoding2 = lazy(
  () => import("./components/general-machine-coding-2"),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>Loading Assignment...</div>}>
        <Routes>
          <Route index element={<App />} />
          <Route path="1" element={<RealTimeUI />} />
          <Route path="2" element={<DOMInteraction />} />
          <Route path="3" element={<CustomHooks />} />
          <Route path="4" element={<StateManagement />} />
          <Route path="5" element={<CustomHooks2 />} />
          <Route path="6" element={<GeneralMachineCoding1 />} />
          <Route path="7" element={<GeneralMachineCoding2 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);
