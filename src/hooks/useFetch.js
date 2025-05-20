import { useEffect, useState } from "react"
import fetchDataApi from "../utils/api"

const usefetch = (url)=>
{
   const [data,setdata] = useState(null);
   const [error, seterror] = useState(null);
   const [loading, setloading] = useState(true);

   useEffect(()=>
   {
    fetchDataApi(url).then((res)=>
    {
       setloading(false)
       setdata(res)
    })
    .catch((err)=>
    {
       setloading(false)
       seterror(err)
    })
   }, [url])
   

   return {data, loading, error};
}

export default usefetch;

