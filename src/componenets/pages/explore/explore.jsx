import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NoPoster from "../../../assets/no-poster.png";
import Circlerating from "../../circlerating/Circlerating";
import "./explore.scss";

export default function explore() {
  const [sort, setsort] = useState("");
  const [genre, setgenre] = useState("");

  const { mediatype } = useParams();
  const addedsort = sort == "" ? "" : `&sort_by=${sort}`;
  const [pagenum, setpagenum] = useState(1);
  const addedgenre = genre == "" ? "" : `&with_genres=${genre}`;
  const endpoint =
    `discover/${mediatype}` + `?page=${pagenum}` + addedsort + addedgenre;

  const { data, loading } = useFetch(endpoint);

  const { url } = useSelector((state) => state.home);
  const [title, settitle] = useState(
    `${mediatype == "movie" ? "Movies" : "Tv Shows"}`
  );

  const navigate = useNavigate();

  function handleclick(id) {
    navigate(`/${mediatype}/${id}`);
  }

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
          onClick={() => handleclick(item.id)}
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
          <h6>{title}</h6>
        </div>

        <div className="filters">
          <div className="genre">
            <select onChange={(e) => setgenre(e.target.value)}>
              <option value="">Selct genere</option>
              <option value="28">Action</option>
              <option value="12">Adventure</option>
              <option value="9648">Mystery</option>
              <option value="35">Comedy</option>
              <option value="16">Animation</option>
              <option value="53">Thriller</option>
              <option value="27">Horror</option>
            </select>
          </div>

          <div className="sort">
            <select onChange={(e) => setsort(e.target.value)}>
              <option value="">Sort by</option>
              <option value="vote_average.asc">Rating Ascending</option>
              <option value="vote_average.desc">Rating Descending</option>
            </select>
          </div>
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
            pagebuttonclicked(e);
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
