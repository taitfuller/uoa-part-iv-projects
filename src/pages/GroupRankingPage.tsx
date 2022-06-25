import React from "react";
import RankingPage from "./RankingPage";
import { useGroup } from "../context/Group";
import Loading from "../components/Loading";

const RankGroup: React.VFC = () => {
  const { groupHasLoaded } = useGroup();

  if (!groupHasLoaded) return <Loading message="Loading Group Data..." />;

  return <RankingPage isGroup={true} />;
};

export default RankGroup;
