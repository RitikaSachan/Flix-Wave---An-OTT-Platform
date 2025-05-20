import React from "react";
import { useParams } from "react-router-dom";
import usefetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import "./details.scss";
import Topbanner from "./topbanner/Topbanner";
import Topcast from "./topcast/Topcast";
import NoPoster from  "../../../assets/no-poster.png"
import Officialvideos from "./videos/Officialvideos";
import Similar from "./similar/Similar";
import Reccomendations from "./reccomendation/Reccomendation"

export default function details() {
  const { id, mediatype } = useParams();

  const { url } = useSelector((state) => state.home);

  const { data, loading } = usefetch(`${mediatype}/${id}`);
  const { data: credits, loading: creditsloading } = usefetch(
    `${mediatype}/${id}/credits`
  );


  const { data: videos, loading: videoloading } = usefetch(
    `${mediatype}/${id}/videos`
  );

  var trailerobject = videos?.results.find(obj => obj.name.includes("Trailer"));

  var trailerlink = `https://www.youtube.com/watch?v=${trailerobject?.key}`;

  const directors = credits?.crew.filter(
    (f) => f.job == "Director" || f.known_for_department == "Diretion"
  );
  const writers = credits?.crew.filter((f) => f.job == "Writer");

  const posterpath = (data?.backdrop_path)
  ? url.backdrop + data?.backdrop_path : NoPoster;

  const background = (data?.poster_path) ? url.backdrop + data?.poster_path : url.backdrop + data?.backdrop_path; 
  return (
    <>
      <Topbanner directors={directors} writers={writers} posterpath={posterpath} data={data} loading={loading} background={background} trailerlink={trailerlink}/>
      <Topcast cast={credits?.cast}/>
      <Officialvideos data={videos?.results}/>
      <Similar mediatype={mediatype} id={id}/>
      <Reccomendations mediatype={mediatype} id={id}/>
    </>
  );
}
