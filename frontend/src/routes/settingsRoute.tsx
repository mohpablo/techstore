import type { RouteObject } from "react-router-dom";
import SettingsPage from "../pages/SettingsPage";

export const settingsRoute: RouteObject = {
  path: "settings",
  element: <SettingsPage />,
};
