import React, { useState } from "react";
import Switchtab from "../switchtab/Switchtab";
import Wrapper from "../../../wrapper/Wrapper";
import useFetch from "../../../../hooks/useFetch";
import Carousal from "../../../../componenets/carousal/Carousal";

export default function Trending() {
  const [movie, setmovie] = useState(true);
  const [endpoint, setendpoint] = useState("movie");
  const { data, loading } = useFetch(`${endpoint}/popular`);

  function handleclick(e) {
    if (e.target.innerHTML === "Movie") {
      setmovie(true);
      setendpoint("movie");
    } else {
      setmovie(false);
      setendpoint("tv");
    }
  }



  return (
    <Wrapper>
      <div className="carousalsection">
        <div className="upper">
          <span className="carousaltitile">Popular</span>
          <Switchtab
            list={["Movie", "TvShow"]}
            handleswitch={handleclick}
            day={movie}
          />
        </div>

        {data && <Carousal list={data.results} mediatype={endpoint} />}
      </div>
    </Wrapper>
  );
}
