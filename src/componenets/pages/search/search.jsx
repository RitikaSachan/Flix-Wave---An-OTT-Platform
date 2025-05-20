import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import usefetch from "../../../hooks/useFetch";
import NoPoster from "../../../assets/no-poster.png";
import Circlerating from "../../circlerating/Circlerating";

export default function search() {
  const { querry } = useParams();
  const [pagenum, setpagenum] = useState(1);

  let text = "";

  const navigate = useNavigate();

  const endpoint = `search/multi?page=${pagenum}&query=`;
  for (let i = 0; i < querry.length; i++) {
    if (querry[i] == " ") text += "%20";
    else text += querry[i];
  }

  console.log(pagenum);

  function handleclick(id, mediatype) {
    navigate(`/${mediatype}/${id}`);
  }

  const { data, loading } = usefetch(endpoint + text);

  const { url } = useSelector((state) => state.home);
  const base = url.poster;


  const items =
    data &&
    data.results.map((item) => {
      const posterpath = item.backdrop_path
        ? base + item.backdrop_path
        : NoPoster;

      return (
        <div
          className="eitem"
          onClick={() => handleclick(item.id, item.media_type)}
          key={item.id}
        >
          <div className="eitemimage">
            <img src={posterpath} />
            <div className="rating">
              <Circlerating rating={item?.vote_average?.toFixed(1)} />
            </div>
          </div>

          <div className="eitemcontent">
            <h5>{item.title || item.name}</h5>
            <h6>
              {item.release_date?.substring(0, 4) ||
                item.first_air_date?.substring(0, 4) ||
                "Not Available"}
            </h6>
          </div>
        </div>
      );
    });

  return (
    <div className="results">
    <div className="upper">
      <div className="title">
        <h6>Search results for "{querry}"</h6>
      </div>
    </div>

    <div className="data">
      {data?.results.length != 0 ? items : <h1>No data found</h1>}
    </div>

    <div className="nextpage_prevpage">
      <button
        className="button"
        onClick={(e) => {
          setpagenum((prevnum) => (prevnum > 1 ? prevnum - 1 : prevnum));
        }}
      >
        Prev Page
      </button>
      <button
        className="button"
        onClick={() => setpagenum((prevnum) => prevnum + 1)}
      >
        Next Page
      </button>
    </div>
  </div>
  );
}
