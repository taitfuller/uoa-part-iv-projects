import React from "react";

import { Chip, ChipProps } from "@mui/material";

interface AllocatedChipProps {
  allocated: boolean;
  allocatedColor?: ChipProps["color"];
}

const AllocatedChip: React.VFC<AllocatedChipProps> = ({
  allocated,
  allocatedColor,
}) =>
  allocated ? (
    <Chip label="Allocated" />
  ) : (
    <Chip label="Unallocated" color={allocatedColor ?? "primary"} />
  );

export default AllocatedChip;
