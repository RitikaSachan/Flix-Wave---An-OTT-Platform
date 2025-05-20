import React, { useEffect, useState } from "react";
import usefetch from "../../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Lazyloadimage from "../../../lazyloadimage/Lazyloadimage";
import "./herobanner.scss";
import Wrapper from "../../../wrapper/Wrapper";
import { useNavigate } from "react-router-dom";


export default function HeroBanner() {
  const base_img_url = "https://image.tmdb.org/t/p/original";

  const navigate = useNavigate();
  const [bg, setbg] = useState("");
  const [querry, setquerry] = useState("");

  const { data, loading } = usefetch("movie/upcoming");

  useEffect(() => {
    const backgrounnd_random =
      base_img_url +
      data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
    setbg(backgrounnd_random);
  }, [data]);

  function handlesearch(e) {
      if(querry!="")navigate(`search/${querry}`);
    }

  return (
    <div className="herobanner">
      {!loading && (
        <div className="background_img">
          <Lazyloadimage src={bg} />
        </div>
      )}

      <div className="blend"></div>

      <Wrapper>
        <div className="herobannercontent">
          <span className="title">Welcome</span>
          <span className="subtitle">
            Explore the vast sea of moves and tv shows
          </span>
        </div>

        <div className="input">
          <input
            className="querry_input"
            onChange={(e) => setquerry(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter" && querry!="") navigate(`search/${querry}`);
            }}
            type="text"
            placeholder="Search for Movies and Tv Shows"
          />
          <button onClick={handlesearch}>Search</button>
        </div>
      </Wrapper>
    </div>
  );
}
