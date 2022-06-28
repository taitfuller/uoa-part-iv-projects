import { useCallback } from "react";

import { useGroup } from "../context/Group";
import { useSnackbar } from "../context/Snackbar";

export const useCopyAccessCode = () => {
  const { groupId } = useGroup();
  const openSnackbar = useSnackbar();

  return useCallback(async () => {
    await navigator.clipboard.writeText(groupId);
    openSnackbar("Access Code Copied!", "success");
  }, [groupId, openSnackbar]);
};
