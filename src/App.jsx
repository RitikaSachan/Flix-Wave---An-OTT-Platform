import "./App.scss";
import fetchDataApi from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import Header from "./componenets/header/header";
import Footer from "./componenets/footer/footer";
import Home from "./componenets/pages/home/home";
import Details from "./componenets/pages/details/details";
import NotFound from "./componenets/pages/404/notFound";
import Explore from "./componenets/pages/explore/explore";
import Search from "./componenets/pages/search/search";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  
  const dispatch = useDispatch();

  useEffect(()=>
  {
    fetchDataApi("configuration").then((res)=>
    {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }
  
      dispatch(getApiConfig(url))
    })
  },[])
  

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:mediatype/:id" element={<Details />}></Route>
          <Route path="/search/:querry" element={<Search />}></Route>
          <Route path="/explore/:mediatype" element={<Explore />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
import { getApiConfig } from "./store/slices/homeSlice";
import { useEffect } from "react";

export default App;
