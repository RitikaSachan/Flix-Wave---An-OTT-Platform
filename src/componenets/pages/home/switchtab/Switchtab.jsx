import React, { useEffect } from 'react'

export default function Switchtab({list, day, handleswitch}) {

  return (
    <>
    <div className="switchtab">
      <div className={`${day? "overlay" : "moveright"}`}></div>
      {list.map((item)=> (<div key={item} onClick={(e)=> handleswitch(e)}><p className='switchtabitem'>{item}</p></div>))}
    </div>
    </>
  )
}
