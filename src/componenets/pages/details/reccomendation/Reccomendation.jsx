import React, { useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import Carousal from "../../../../componenets/carousal/Carousal";
import "./Reccomendation.scss";

export default function Similar({ mediatype, id }) {
  const { data, loading } = useFetch(`${mediatype}/${id}/recommendations`);

  return data?.results?.length == 0 ? null : (
    <div className="carousalsection_recco">
      <div className="upper">
        <h1 className="carousaltitile">Recomendations</h1>
      </div>

      {data && <Carousal list={data.results} mediatype={mediatype} />}
    </div>
  );
}
