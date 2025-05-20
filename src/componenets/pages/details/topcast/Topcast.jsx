import React from "react";
import "./Topcast.scss";
import { useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import NoProfile from "../../../../assets/avatar.png";

export default function ({ cast }) {
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

  const { profile } = useSelector((state) => state.home.url);
  const items_raw = cast?.slice(0, 20);
  const items = items_raw?.map((item) => {
  const profilepicture = item.profile_path? profile + item.profile_path : NoProfile;
 
    return (
      <div className="castitem" key={item.id}>
        <div className="castimage">
          <img src={profilepicture}></img>
        </div>

        <div className="castname">
          <p>{item?.original_name}</p>
          <p className="character_name">{item.character}</p>
        </div>
      </div>
    );
  });

  return cast?.length==0 ? null : 
    (<div className="topcast">
    <h1>Top Cast</h1>
      {items && <Carousel 
      slidesToSlide={5}
      infinite={false}
      transitionDuration={500}
      responsive={responsive}
      removeArrowOnDeviceType={["mobile", "bigmobile"]}
      >{items}</Carousel>}
    </div>
  );
}
