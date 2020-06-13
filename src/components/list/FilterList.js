import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { RocketTextbox, RocketSelect, RocketOption } from "../rocket";

const FilterList = ({
  options,
  filterable,
  onSelection,
  keyField,
  textField,
}) => {
  const [list, setList] = useState([]);
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    const items = setupList(options);
    setList(items);
    setDisplay(items);
  }, [options]);

  const onChange = (event) => {
    const { value } = event.target;
    onSelection(value);
  };

  const onFilterChange = (event) => {
    const { value } = event.target;
    const items = filterList(value);

    setDisplay(items);
  };

  const setupList = () => {
    const items = [...(options || [])].map((x) => {
      return { key: x[keyField], text: x[textField] };
    });
    return items;
  };

  const filterList = (filter) => {
    if (filter) {
      return [...(list || [])].filter(
        (x) => x.text && x.text.toLowerCase().indexOf(filter.toLowerCase()) >= 0
      );
    }
    return [...(list || [])];
  };

  return (
    <>
      {filterable && (
        <div>
          <RocketTextbox
            type="text"
            name="filter"
            onChange={onFilterChange}
          ></RocketTextbox>
        </div>
      )}
      <RocketSelect multiple="multiple" onChange={onChange}>
        {display.map((x) => {
          const { key, text } = x;
          return (
            <RocketOption key={key} value={key}>
              {text}
            </RocketOption>
          );
        })}
      </RocketSelect>
    </>
  );
};

FilterList.propTypes = {
  options: PropTypes.array,
  filterable: PropTypes.bool,
  onSelection: PropTypes.func,
  keyField: PropTypes.string,
  textField: PropTypes.string,
};

FilterList.defaultProps = {
  options: [],
  filterable: false,
  onSelection: (key) => {},
  keyField: "key",
  textField: "text",
};

export default FilterList;
