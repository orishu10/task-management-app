import React from "react";
import { fromLonLat } from "ol/proj.js";
import { RMap, ROSM } from "rlayers";

import "ol/ol.css";

const center = fromLonLat([2.364, 48.82]);

export const OpenLayersmap = () => {
  return (
    <div className="map">
      <RMap
        width={"100%"}
        height={"80vh"}
        initial={{ center: center, zoom: 10 }}
      >
        <ROSM />
      </RMap>
    </div>
  );
};
