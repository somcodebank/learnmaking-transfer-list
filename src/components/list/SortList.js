import PropTypes from "prop-types";
import React from "react";

const SortList = ({ list, sortable }) => {
  return (
    <>
      <h2>SortList</h2>
      <span>sortable: {sortable}</span>
    </>
  );
};

SortList.propTypes = {
  list: PropTypes.array,
  sortable: PropTypes.bool,
};

SortList.defaultProps = {
  list: [],
  sortable: false,
};

export default SortList;
