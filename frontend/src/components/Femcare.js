import React from "react";
import Feed from "./Feed";
import "./css/Femcare.css";

function Femcare({postsProp, setPostsProp}) {
  return (
    <div className="femcare">
      <div className="femcare_contents">
        <div className="femcare_content">
          <Feed postsProp={ postsProp } setPostsProp={ setPostsProp }/>
        </div>
      </div>
    </div>
  );
}

export default Femcare;
