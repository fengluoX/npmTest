import React from "react";
import ReactDom from "react-dom";

const App: React.FC = () => {
  return <>APP</>;
};

export default (container?: Element) => {
  if (container) {
    return ReactDom.createPortal(<App />, container);
  }
  return <App />;
};
