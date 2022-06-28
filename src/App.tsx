import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import ExplorePage from "./pages/ExplorePage";
import RankingPage from "./pages/RankingPage";
import GroupRankingPage from "./pages/GroupRankingPage";
import JoinGroupPage from "./pages/JoinGroupPage";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="explore" element={<ExplorePage />} />
      <Route path="my-ranking" element={<RankingPage />} />
      <Route path="group-ranking">
        <Route index element={<GroupRankingPage />} />
        <Route path="join" element={<JoinGroupPage />} />
      </Route>
      <Route index element={<Navigate to="explore" replace />} />
      <Route path="*" element={<Navigate to="explore" replace />} />
    </Route>
  </Routes>
);

export default App;
