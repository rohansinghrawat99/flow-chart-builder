import React from "react";

export const FlowChartContext = React.createContext<{
  nodes: any,
  edges: any,
  handleAddOneNode: Function;
  handleAddTwoNode: Function;
  handleDeleteNode: Function;
}>({
  nodes: [],
  edges: [],
  handleAddOneNode: () => {},
  handleAddTwoNode: () => {},
  handleDeleteNode: () => {},
});
