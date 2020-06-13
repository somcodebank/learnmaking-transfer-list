import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import { FilterList, SortList, TransferList } from "./components/list";
import data from "./data.json";

const App = () => {
  // const sourceList = data;
  // const targetList = data;

  const [sourceList, setSourceList] = useState([]);

  useEffect(() => {
    const items = [...(data || [])]
      .filter((x) => x.config && x.config.field)
      .map((x) => {
        const { text, field: key } = x.config || {};
        return { key, text };
      });
    setSourceList(items);
  }, [data]);

  return (
    <>
      <div>
        <Router>
          <div>
            <Header />
          </div>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/filter">
              <FilterList />
            </Route>
            <Route path="/sort">
              <SortList />
            </Route>
            <Route
              path="/xfer"
              component={() => <TransferList sourceList={sourceList} />}
            ></Route>
          </Switch>
        </Router>
      </div>
    </>
  );
};

export default App;
