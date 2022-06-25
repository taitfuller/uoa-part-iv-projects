import React from "react";
import RankingPage from "./RankingPage";
import { useGroup } from "../context/Group";
import { useCopyAccessCode } from "../hooks/copy";
import Loading from "../components/Loading";

const RankGroup: React.VFC = () => {
  const { groupHasLoaded } = useGroup();
  const copyAccessCode = useCopyAccessCode();

  if (!groupHasLoaded) return <Loading message="Loading Group Data..." />;

  return <RankingPage isGroup={true} copyAccessCode={copyAccessCode} />;
};

export default RankGroup;
