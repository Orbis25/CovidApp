import React from "react";
import Navigation from "./app/navigation/Navigation/Index";
import * as eva from "@eva-design/eva";

import { ApplicationProvider } from "@ui-kitten/components";
export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Navigation />
    </ApplicationProvider>
  );
}
