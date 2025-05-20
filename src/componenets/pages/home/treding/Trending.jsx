import React, { useState } from 'react'
import Switchtab from '../switchtab/Switchtab'
import Wrapper from "../../../wrapper/Wrapper"
import useFetch from "../../../../hooks/useFetch"
import Carousal from '../../../../componenets/carousal/Carousal';



export default function Trending() {
  const [day, setday] = useState(true);


  const [endpoint, setendpoint] = useState("day");

  const {data, loading} = useFetch(`trending/all/${endpoint}`)

  function handleclick(e)
  {
    if(e.target.innerHTML==="Day"){
      setday(true);
      setendpoint("day")
    }
    else{
      setday(false)
      setendpoint("week")
    }
  }


  return (

    <Wrapper>
    <div className="carousalsection">
        <div className="upper">
        <span className="carousaltitile">Trending</span>
        <Switchtab list={["Day", "Week"]} handleswitch={handleclick} day={day}/>
        </div>

        {data && <Carousal list={data.results} mediatype={"movie"}/>}
    </div>
    </Wrapper>
  )
}
