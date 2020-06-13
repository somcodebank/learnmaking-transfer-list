import PropTypes from "prop-types";
import React, { createRef, useState, useEffect, useRef } from "react";
import { FilterList } from ".";
// import { RocketItem, RocketList } from "../rocket";

const TransferList = ({ sourceList, targetList }) => {
  const [source, setSource] = useState(null);
  const [target, setTarget] = useState(null);
  const [sourceDisplay, setSourceDisplay] = useState([]);
  const [sourceItems, setSourceItems] = useState([]);
  const [targetItems, setTargetItems] = useState([]);

  const refItems = useRef(
    sourceList.map(({ key }) => {
      const ref = createRef();
      return { key, ref };
    })
  );

  useEffect(() => {
    setSourceItems(sourceList);
    setSourceDisplay(sourceList);
  }, [sourceList]);

  useEffect(() => {
    setTargetItems(targetList);
  }, [targetList]);

  const onUp = (event) => {
    const {
      target: { value },
    } = event;

    const len = targetItems.length;
    const idx = targetItems.findIndex((x) => x.key == target);

    if (idx > 0) {
      const newTargetItems = [...targetItems];
      newTargetItems[idx - 1] = targetItems[idx];
      newTargetItems[idx] = targetItems[idx - 1];
      setTargetItems(newTargetItems);
    }
  };
  const onDown = (event) => {
    const {
      target: { value },
    } = event;

    const len = targetItems.length;
    const idx = targetItems.findIndex((x) => x.key == target);

    if (idx < len) {
      const newTargetItems = [...targetItems];
      newTargetItems[idx] = targetItems[idx + 1];
      newTargetItems[idx + 1] = targetItems[idx];
      setTargetItems(newTargetItems);
    }
  };
  const onSourceSelection = (value) => {
    console.log("source-selection", value);
    setSource(value);
  };
  const onTargetSelection = (value) => {
    console.log("target-selection", value);
    setTarget(value);
  };
  const onIn = (event) => {
    // from source˜
    const newSourceItems = sourceItems.map((x) => {
      if (x.key == source) x.selected = true;
      return x;
    });
    setSourceItems(newSourceItems);
    setSourceDisplay(newSourceItems.filter((x) => !x.selected));
    // to target
    const newTargetItems = targetItems.concat(
      newSourceItems.filter((x) => x.key == source)
    );
    setTargetItems(newTargetItems);
    setSource(null);
    // setTarget(null);

    // setFocus
    setFocus(source);
  };
  const onOut = (event) => {
    console.log("onOut", target);
    // to source
    const newSourceItems = sourceItems.map((x) => {
      if (x.key == target) delete x.selected;
      return x;
    });
    setSourceItems(newSourceItems);
    setSourceDisplay(newSourceItems.filter((x) => !x.selected));
    // from target
    const newTargetItems = targetItems.filter((x) => x.key != target);
    setTargetItems(newTargetItems);
    // setSource(null);
    setTarget(null);

    //setFocus
    setFocus(target);
  };
  const setFocus = (key) => {
    if (refItems) {
      refItems.current.map((x) => {
        if (x.key == key && x.ref) {
          console.log("found---(x)", { refItems, x });
          // const { current } = x.ref;
          // current.getInstance().focus();
          x.ref.focus();
          console.log(`found---${key}`);
        }
      });
    }
  };
  return (
    <>
      <div style={{ width: "5%" }}></div>
      <div style={{ width: "40%" }}>
        <h2>Transfer List</h2>
        <FilterList
          options={sourceDisplay}
          filterable={false}
          onSelection={onSourceSelection}
          ref={refItems}
        />
      </div>
      <div style={{ width: "5%" }}>
        <div>
          <button
            name="in"
            onClick={onIn}
            value="in"
            disabled={source ? false : true}
          >
            IN
          </button>
        </div>
        <div>
          <button
            name="out"
            onClick={onOut}
            value="out"
            disabled={target ? false : true}
          >
            OUT
          </button>
        </div>
      </div>
      <div style={{ width: "40%" }}>
        <h2>Selection List</h2>
        <FilterList
          options={targetItems}
          filterable={false}
          onSelection={onTargetSelection}
        />
      </div>
      <div style={{ width: "5%" }}>
        <div>
          <button
            name="up"
            onClick={onUp}
            value="up"
            disabled={target && (targetItems || []).length > 1 ? false : true}
          >
            UP
          </button>
        </div>
        <div>
          <button
            name="down"
            onClick={onDown}
            value="down"
            disabled={target && (targetItems || []).length > 1 ? false : true}
          >
            DOWN
          </button>
        </div>
      </div>
      <div style={{ width: "5%", backgroundColor: "orange" }}></div>
    </>
  );
};

TransferList.propTypes = {
  sourceList: PropTypes.array,
  targetList: PropTypes.array,
};

TransferList.defaultProps = {
  sourceList: [],
  targetList: [],
};

export default TransferList;
