import { useCallback } from "react";

import { useGroup } from "../contexts/Group";
import { useSnackbar } from "../contexts/Snackbar";

export const useCopyAccessCode = () => {
  const { groupId } = useGroup();
  const openSnackbar = useSnackbar();

  return useCallback(async () => {
    await navigator.clipboard.writeText(groupId);
    openSnackbar("Access Code Copied!", "success");
  }, [groupId, openSnackbar]);
};
