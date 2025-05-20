import React, { useState } from "react";
import Wrapper from "../../../wrapper/Wrapper";
import useFetch from "../../../../hooks/useFetch";
import Carousal from "../../../../componenets/carousal/Carousal";
import "./Similar.scss";

export default function Similar({ mediatype, id }) {
  const { data, loading } = useFetch(`${mediatype}/${id}/similar`);
  return data?.results?.length == 0 ? null : (
    <div className="carousalsection_similar">
      <div className="upper">
        <h1 className="carousaltitile">Similar</h1>
      </div>

      {data && <Carousal list={data.results} mediatype={mediatype} />}
    </div>
  );
}
