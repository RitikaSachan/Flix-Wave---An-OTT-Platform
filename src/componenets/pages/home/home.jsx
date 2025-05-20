import React from "react";
import HeroBanner from "./herobanner/HeroBanner";
import Trending from "./treding/Trending";
import Popular from "./populr/Popular";
import Toprated from "./toprated/Toprated";
import "./home.scss";

export default function home() {
  return (
    <>
      <HeroBanner />
      <div className="homesection">
        <Trending />
      </div>
      <div className="homesection">
        <Popular />
      </div>
      <div className="homesection">
        <Toprated />
      </div>
    </>
  );
}
