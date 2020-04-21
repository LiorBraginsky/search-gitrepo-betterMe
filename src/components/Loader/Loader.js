import React from "react";
import "./styles.scss";
import { cancel } from "../../utils/axios";

export default function Loader() {
  const cancelRequest = () => {
    cancel();
  };
  return (
    <div className="loader">
      <div className="text">Loading</div>
      <div className="dots">
        <div />
        <div />
        <div />
      </div>
      <button type="button" onClick={() => cancelRequest()}>
        Cancel Request
      </button>
    </div>
  );
}
