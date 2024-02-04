import { useState, useEffect } from 'react'
import { fetchDataFromAPI } from './utils/api'
import { useDispatch, useSelector } from "react-redux"
import { getAPIConfiguration, getGeners } from './Store/homeslice'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import D404 from './pages/404/404'
import Details from './pages/details/Details'
import Explore from './pages/explore/Explore'
import Home from './pages/Home/Home'
import SearchResult from './pages/searchResult/SearchResult'
import Header from "./components/header/Header"
import Footer from './components/footer/Footer'


function App() {
    const dispatch = useDispatch()
    const [configFetched, setConfigFetched] = useState(false);


    useEffect(() => {
        fetchAPIConfig()
        genersCall()
    }, [])

    const fetchAPIConfig = () => {
        fetchDataFromAPI("/configuration")
            .then((res) => {
                const url = {
                    backdrop: res.images.secure_base_url + "original",
                    poster: res.images.secure_base_url + "original",
                    profile: res.images.secure_base_url + "original",
                };
                console.log("url");
                console.log(url);
                dispatch(getAPIConfiguration(url));
                setConfigFetched(true);
            })
            .catch((error) => {
                console.error("Error fetching API configuration:", error);
            });
    };
    const genersCall = async () => {
        let promoise = []
        let endpoints = ["tv", "movie"]
        let allGeners = {}

        endpoints.forEach(url => {
            promoise.push(fetchDataFromAPI(`/genre/${url}/list`))
        })
        const data = await Promise.all(promoise)
        console.log(data)
        data.map(genres => {
            return (genres.genres.map(val => {
                allGeners[val.id] = val
            }))
        })

        dispatch(getGeners(allGeners))
    }



    return (
        <BrowserRouter>
            <Header />
            {configFetched && (
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="/:mediaType/:id" element={<Details />} />
                    <Route path="/search/:query" element={<SearchResult />} />
                    <Route path="/explore/:mediaType" element={<Explore />} />
                    <Route path='*' element={<D404 />} />
                </Routes>
            )}
            <Footer />
        </BrowserRouter>
    )
}

export default App
