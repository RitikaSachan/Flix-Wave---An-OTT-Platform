import React from 'react'
import Circlerating from "../../../circlerating/Circlerating";
import { Playbtn } from "../playbtn/Playbtn";

export default function ({directors,writers,posterpath,data,loading,background,trailerlink}) {

  function handleclick()
  {
    window.open(trailerlink, '_blank');
  }

  return (
   <>
    <div className="backgroundimagedetails">
        <img src={background}></img>
      </div>

      <div className="detailsblend"></div>

      <div className="details">
        <div className="imagesection">
          {!loading && <img className="posterimage" src={posterpath}></img>}
        </div>

        <div className="detailsection">
          <h1>
            {data?.title || data?.name} (
            {data?.release_date?.substring(0, 4) ||
              data?.first_air_date?.substring(0, 4)}
            )
          </h1>
          <h3>{data?.tagline}</h3>

          <div className="rating-btn">
          <div className="circlerating">
          <Circlerating
            rating={data?.vote_average.toFixed(1)}
            bg="black"
            txtcolor="white"
          />
          </div>
          
          <div className="playbtn" onClick={handleclick}>
          <Playbtn/> 
          <span>Watch Trailer</span>
          </div>
          
          </div>
 
          <div className="overview">
            <h2>Overview</h2>
            <p>{data?.overview.substring(0, 150)}...</p>
          </div>

          <div className="otherinfo">
            <div className="top">
              <div className="status">
                <h4>Status: </h4>
                <h4>{" " + data?.status}</h4>
              </div>

              <div className="release">
                <h4>Release Date: </h4>
                <h4>{data?.release_date || data?.first_air_date}</h4>
              </div>

              <div className="runtime">
                <h4>Runtime: </h4>
                <h4>{(data?.runtime &&  data.runtime + " Min") || (data?.episode_run_time && + " Min") || "Not Available"}</h4>
              </div>
            </div>

            <div className="middle">
              <h4>Director: </h4>

              {directors?.length == 0 ? (
                <h4>Not Available</h4>
              ) : (
                directors?.map((item) => <h4>{item.name}</h4>)
              )}
            </div>

            <div className="bottom">
              <h4>Writers: </h4>
              {writers?.length == 0 ? (
                <h4>Not Available</h4>
              ) : (
                writers?.map((item) => <h4>{item.name}</h4>)
              )}
            </div>
          </div>
        </div>
      </div>
   </>
  )
}
