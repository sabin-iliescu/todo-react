import React from "react";

const PrioritySelect = ({ priority, setPriority }) => {
  return (
    <select
      className="form-select"
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
    >
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
  );
};

export default PrioritySelect;
