import type { FC } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OutfitLayout from "./layouts/OutfitLayout";
import LandMainScreen from "./pages/land/MainScreen";
import LandViewAll from "./pages/land/ViewAll";
import BuildingMainScreen from "./pages/all-building/MainScreen";
import BuildingViewAll from "./pages/all-building/ViewAll";

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<OutfitLayout />}>
        <Route path="/" element={<Navigate to="/land" replace />} />
        <Route path="/land" element={<LandMainScreen />} />
        <Route path="/land/view-all" element={<LandViewAll />} />
        <Route path="/all-building" element={<BuildingMainScreen />} />
        <Route path="/all-building/view-all" element={<BuildingViewAll />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
