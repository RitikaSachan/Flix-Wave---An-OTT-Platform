import axios from "axios";

const base_url = "https://api.themoviedb.org/3/";

const headers = {
   accept : "application/json",
   Authorization : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDQzYjk3ZDliMDA1OGY2MDIwMmY1NGU0NzQ1YTE2NiIsInN1YiI6IjY1YWI3ODY0YmU2ZDg4MDBiYzkyNzQ5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XhVhDv4qJFVnfbdAdQo4oz_O86qi325zqZZqIb-WEK0"
}

const fetchDataApi = async (url, params)=>
{
   try {

    const {data} = await axios.get
    ((base_url+url),{headers, params});
    return data;

   } catch (error) {

    console.log(err);
    return err;
   }
}

 export default fetchDataApi;