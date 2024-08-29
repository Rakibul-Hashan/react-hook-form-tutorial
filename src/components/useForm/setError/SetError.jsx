import React from "react";
import SetError_all_rules from "./SetError_all_rules";
import SetError_single from "./SetError_single";
import SetError_multiple from "./SetError_multiple";
import SetError_server_error from "./SetError_server_error";
import SetError_global_error from "./SetError_global_error";

const SetError = () => {
  return (
    <div>
      <h1>setError</h1>
      {/* <SetError_single /> */}
      {/* <SetError_multiple /> */}
      {/* <SetError_all_rules /> */}
      {/* <SetError_server_error /> */}
      <SetError_global_error />
    </div>
  );
};

export default SetError;
