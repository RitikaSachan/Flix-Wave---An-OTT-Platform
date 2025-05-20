import React from "react";
import "./Carousal.scss";
import { useSelector } from "react-redux";
import Circlerating from "../circlerating/Circlerating";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import NoPoster from "../../assets/no-poster.png";
import { useNavigate } from "react-router-dom";

export default function Carousal({ list, mediatype}) {
  const { url } = useSelector((state) => state.home);

  const navigate = useNavigate();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1200 },
      items: 8.5,
    },
    desktop: {
      breakpoint: { max: 1200, min: 900 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 900, min: 600 },
      items: 4,
    },
    bigmobile: {
      breakpoint: { max: 600, min: 500 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 2,
    },
  };

  function handleclick(itemid, media_type) {
    navigate(`/${media_type || mediatype}/${itemid}`);
  }

  const base = url.poster;
  const items = list.map((item) => {
    const posterpath = item.backdrop_path
      ? base + item.backdrop_path
      : NoPoster;
      

    return (
      <div className="item" onClick={() => handleclick(item.id, item.media_type)} key={item.id}>
        <div className="itemimage">
          <img src={posterpath} />
          <div className="rating">
            <Circlerating rating={item.vote_average.toFixed(1)} />
          </div>
        </div>

        <div className="itemcontent">
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
    <Carousel
      slidesToSlide={5}
      infinite={false}
      transitionDuration={500}
      responsive={responsive}
      removeArrowOnDeviceType={["mobile", "bigmobile"]}
    >
      {items}
    </Carousel>
  );
}
