import React from 'react'
import {CircularProgressbar, buildStyles} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import "./Circlerating.scss"

export default function ({rating, bg="white", txtcolor="black"}) {
  return (
    <div className="circleRating">
        <CircularProgressbar
                value={rating}
                maxValue={10}
                text={rating}
                background
                backgroundPadding={3}
                strokeWidth={5}
                styles={buildStyles({
                  pathColor:
                  rating < 5 ? "red": rating < 7 ? "orange":"green",
                  textColor: txtcolor,
                  textSize: "1.3rem",
                  backgroundColor: bg,
                })}
              />
    </div>
  )
}
