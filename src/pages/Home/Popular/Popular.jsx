import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../../components/Content-Wrapper/ContentWrapper'
import UseFetchData from '../../../Hooks/UseFetch'
import SwitchTabs from '../../../components/swithTabs/SwithTabs'
import '../style.scss'
import Carousel from '../../../components/carousel/Carousel'

function Popular() {
    const [endpoint, setEndPoint] = useState("movie")

    const { data, loading, error } = UseFetchData(`/${endpoint}/popular`)

    const onTabChange = (tab) => {
        setEndPoint(tab === 'Movie' ? "movie" : "tv");
    }
    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Popular Movies</span>
                <SwitchTabs data={["Movie", "TV"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
        </div>
    );

}

export default Popular
