import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";
import { FilterList } from ".";
import { RocketFlexContainer, RocketXferAction } from "../rocket";

const TransferList = ({ sourceList, targetList }) => {
  const [source, setSource] = useState(null);
  const [target, setTarget] = useState(null);
  const [displayItems, setDisplayItems] = useState([]);
  const [sourceItems, setSourceItems] = useState([]);
  const [targetItems, setTargetItems] = useState([]);

  useEffect(() => {
    setSourceItems(sourceList);
    setDisplayItems(sourceList);
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
    setSource(value);
  };
  const onTargetSelection = (value) => {
    setTarget(value);
  };
  const onIn = (event) => {
    // from source˜
    const newSourceItems = sourceItems.map((x) => {
      if (x.key == source) x.selected = true;
      return x;
    });
    setSourceItems(newSourceItems);
    setDisplayItems(newSourceItems.filter((x) => !x.selected));
    // to target
    const newTargetItems = targetItems.concat(
      newSourceItems.filter((x) => x.key == source)
    );
    setTargetItems(newTargetItems);
    setSource(null);
    setTarget(null);
  };
  const onOut = (event) => {
    // to source
    const newSourceItems = sourceItems.map((x) => {
      if (x.key == target) delete x.selected;
      return x;
    });
    setSourceItems(newSourceItems);
    setDisplayItems(newSourceItems.filter((x) => !x.selected));
    // from target
    const newTargetItems = targetItems.filter((x) => x.key != target);
    setTargetItems(newTargetItems);
    setSource(null);
    setTarget(null);
  };
  const onInAll = (event) => {
    // from source˜
    const newSourceItems = sourceItems.map((x) => {
      x.selected = true;
      return x;
    });
    setSourceItems(newSourceItems);
    setDisplayItems([]);
    // to target
    const newTargetItems = newSourceItems;
    setTargetItems(newTargetItems);
    setSource(null);
    setTarget(null);
  };
  const onOutAll = (event) => {
    // to source
    const newSourceItems = sourceItems.map((x) => {
      delete x.selected;
      return x;
    });
    setSourceItems(newSourceItems);
    setDisplayItems(newSourceItems);
    // from target
    setTargetItems([]);
    setSource(null);
    setTarget(null);
  };
  const setConfig = () => {
    alert(JSON.stringify(targetItems.map((x) => x.key)));
  };
  return (
    <RocketFlexContainer>
      <RocketFlexContainer
        style={{ width: "5%", backgroundColor: "orange" }}
      ></RocketFlexContainer>
      <RocketFlexContainer justify="left" style={{ width: "30%" }}>
        <h2>Transfer List</h2>
        <FilterList
          options={displayItems}
          filterable={false}
          onSelection={onSourceSelection}
        />
      </RocketFlexContainer>
      <RocketFlexContainer
        style={{ width: "15%", alignSelf: "flex-end" }}
        direction="column"
      >
        <RocketXferAction
          name="inall"
          onClick={onInAll}
          value="inall"
          disabled={displayItems && displayItems.length > 0 ? false : true}
        >
          Select All
        </RocketXferAction>
        <RocketXferAction
          style={{ marginBottom: "19px" }}
          name="in"
          onClick={onIn}
          value="in"
          disabled={source ? false : true}
        >
          Select
        </RocketXferAction>
        <RocketXferAction
          style={{ marginTop: "19px" }}
          name="out"
          onClick={onOut}
          value="out"
          disabled={target ? false : true}
        >
          Remove
        </RocketXferAction>
        <RocketXferAction
          style={{ marginBottom: "10px" }}
          name="outall"
          onClick={onOutAll}
          value="outall"
          disabled={targetItems && targetItems.length > 0 ? false : true}
        >
          Remove All
        </RocketXferAction>
      </RocketFlexContainer>
      <RocketFlexContainer justify="left" style={{ width: "30%" }}>
        <h2>Selection List</h2>
        <FilterList
          options={targetItems}
          filterable={false}
          onSelection={onTargetSelection}
        />
      </RocketFlexContainer>
      <RocketFlexContainer
        style={{ width: "15%", alignSelf: "center" }}
        direction="column"
        justify="center"
      >
        <RocketXferAction
          name="up"
          onClick={onUp}
          value="up"
          disabled={
            !target ||
            (targetItems || []).findIndex((x) => x.key == target) <= 0
              ? true
              : false
          }
        >
          Move Up
        </RocketXferAction>
        <RocketXferAction
          style={{ marginBottom: "50px" }}
          name="down"
          onClick={onDown}
          value="down"
          disabled={
            !target ||
            (targetItems || []).findIndex((x) => x.key == target) >=
              (targetItems || []).length - 1
              ? true
              : false
          }
        >
          Move Down
        </RocketXferAction>
      </RocketFlexContainer>
      <RocketFlexContainer
        style={{ width: "5%", backgroundColor: "orange" }}
      ></RocketFlexContainer>
      <RocketXferAction onClick={setConfig}>Set Config</RocketXferAction>
    </RocketFlexContainer>
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
