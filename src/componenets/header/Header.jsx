import React, { useState } from "react";
import "./Header.scss";
import logo from "../../assets/flash.png";
import search from "../../assets/search.svg";
import hamburger from "../../assets/hamburger.svg";
import cross from "../../assets/crossed.png";
import { useNavigate } from "react-router-dom";

export default function header() {
  const navigate = useNavigate();

  const [isVisible, setisVisible] = useState(true);
  const [prevscrolly, setprevscrolly] = useState(0);
  const [blurrheader, setblurrheader] = useState(false);
  const [mobileview, setmobileview] = useState(window.outerWidth < 460 ? true : false);
  const [opensearch, setopensearch] = useState(false);
  const [querry, setquerry] = useState("");
  const [openham, setopenham] = useState(false);

  const handlescroll = () => {
    if (window.scrollY > 300) {
      setisVisible(false);
    }

    if (window.scrollY > prevscrolly) {
      setprevscrolly(window.scrollY);
    }

    if (window.scrollY < prevscrolly && window.scrollY > 300) {
      setblurrheader(true);
      setisVisible(true);
    } else if (window.scrollY < prevscrolly && window.scrollY < 280) {
      setblurrheader(false);
      setisVisible(true);
    }
  };

  function handleresize() {
    if (window.outerWidth < 460) setmobileview(true);
    else {
      setmobileview(false);
      setopenham(false);
    }
  }

  function handleKeyDown(e)
  {
    if(e.key==="Enter") 
    {
      navigate(`search/${querry}`);
      setopensearch(false);
    }
  }


  function handlesearch() {
    setopensearch(true);
  }

  function handledropmenu() {
    setopenham((prevstate) => !prevstate);
  }

  window.addEventListener("scroll", handlescroll);
  window.addEventListener("resize", handleresize);

  return (
    <div
      className={`${isVisible ? "" : "hidden"} ${
        blurrheader ? "header-up" : "header"
      } ${openham ? "menuopened" : ""}`}
    >
      <div className="logo">
        <img
          src={logo}
          onClick={() => {
            navigate("/");
          }}
          alt="logo"
        ></img>
      </div>

      <div className="navigation-icons">
        <ul>
          <li>
            <img onClick={handlesearch} className="icon" src={search}></img>
          </li>

          {!mobileview ? (
            <>
              <li>
                <a href="/explore/movie">Movie</a>
              </li>
              <li>
                <a href="/explore/tv">TV Shows</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <img
                  onClick={handledropmenu}
                  className="icon"
                  src={hamburger}
                ></img>
              </li>
            </>
          )}
        </ul>
      </div>

      {openham && mobileview ? (
        <div className="dropmenu">
          <ul>
            <li>
              <a href="/explore/movie">Movie</a>
            </li>
            <li>
              <a href="/explore/tv">TV Shows</a>
            </li>
          </ul>
        </div>
      ) : null}

      {opensearch ? (
        <div className="dropsearch">
          <input
            onChange={(e) => {
              setquerry(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search here..."
            type="text"
          ></input>
          <img
            className="icon"
            onClick={() => {
              setopensearch(false);
              setquerry("");
            }}
            src={cross}
          ></img>
        </div>
      ) : null}
    </div>
  );
}
