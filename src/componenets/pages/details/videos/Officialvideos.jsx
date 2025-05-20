import React from "react";
import Carousel from "react-multi-carousel";
import "./Officialvideos.scss";
import PlayIcon from "../../../../assets/officialvideo.png";
import { useNavigate } from 'react-router-dom';

export default function ({ data }) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1200 },
      items: 5.8,
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

  function handleclick(key)
  {
    const videoUrl = `https://www.youtube.com/watch?v=${key}`;
    window.open(videoUrl, '_blank')
  }

  const videoitems = data?.map((video) => {
    return (
      <div className="videoitem" key={video.id} onClick={()=> handleclick(video.key)}>
        <div className="videothumbnail">
          <img
            className="thumbnail"
            src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
          />

          <div className="playicon">
            <img src={PlayIcon}></img>
          </div>
        </div>

        <div className="videotitle">
          <p>{video.name}</p>
        </div>
      </div>
    );
  });

  return data?.length==0 ? null :   (
    <div className="officialvideos">
      <h1>Official Videos</h1>
      {videoitems && (
        <Carousel
          slidesToSlide={5}
          infinite={false}
          transitionDuration={500}
          responsive={responsive}
          removeArrowOnDeviceType={["mobile", "bigmobile"]}
        >
          {videoitems}
        </Carousel>
      )}
    </div>
  );
}
