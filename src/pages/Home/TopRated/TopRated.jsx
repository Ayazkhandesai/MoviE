import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../../components/Content-Wrapper/ContentWrapper'
import UseFetchData from '../../../Hooks/UseFetch'
import SwitchTabs from '../../../components/swithTabs/SwithTabs'
import '../style.scss'
import Carousel from '../../../components/carousel/Carousel'

function TopRated() {
    const [endpoint, setEndPoint] = useState("movie")
    console.log(endpoint)

    const { data, loading, error } = UseFetchData(`/${endpoint}/top_rated`)

    const onTabChange = (tab) => {
        // console.log(tab)
        setEndPoint(tab === 'Movies' ? "movie" : "tv");
    }

    console.log(data)
    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Top Rated</span>
                <SwitchTabs data={["Movies", "TV"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
        </div>
    );

}

export default TopRated
