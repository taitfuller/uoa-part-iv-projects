import React, { useCallback } from "react";
import useLocalStorage from "use-local-storage";

import { Alert, AlertColor } from "@mui/material";

interface HideableAlertProps {
  localStorageKey: string;
  message: string;
  severity?: AlertColor;
}

const HideableAlert: React.FC<HideableAlertProps> = ({
  localStorageKey,
  message,
  severity = "info",
}) => {
  const [isHidden, setHidden] = useLocalStorage(localStorageKey, false);

  const hide = useCallback(() => setHidden(true), [setHidden]);

  if (isHidden) return <></>;

  return (
    <Alert severity={severity} onClose={hide}>
      {message}
    </Alert>
  );
};

export default HideableAlert;
