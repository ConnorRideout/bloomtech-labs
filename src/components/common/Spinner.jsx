import React from "react";

import '../../styles/Spinner.less';

export default function Spinner() {
  return (
    <div className="loading-spinner-background">
      <div className="loading-spinner" />
    </div>
  );
}