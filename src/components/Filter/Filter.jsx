import React from "react";

const Filter = ({ value, onChangeFilter }) => (
  <>
  <p>Find contacts by name</p>
    <input
      type="text"
      value={value}
      onChange={onChangeFilter}
      placeholder="Search..."
    ></input>
  </>
);

export default Filter;
