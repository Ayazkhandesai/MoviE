import React, { useState } from "react";

import Carousel from '../../../components/carousel/Carousel'
import ContentWrapper from '../../../components/Content-Wrapper/ContentWrapper'
import SwitchTabs from '../../../components/swithTabs/SwithTabs'

import UseFetchData from '../../../hooks/UseFetch'

const Trending = () => {
    const [endpoint, setEndpoint] = useState("day");

    const { data, loading } = UseFetchData(`/trending/movie/${endpoint}`);


    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Trending</span>
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} />
        </div>
    );
};

export default Trending;

// import React, { useEffect, useState } from 'react'
// import ContentWrapper from '../../../components/Content-Wrapper/ContentWrapper'
// import UseFetchData from '../../../Hooks/useFetch'
// import SwitchTabs from '../../../components/SwithTabs/SwithTabs'
// import '../style.scss'
// import Carousel from '../../../components/Carousel/Carousel'

// function Trending() {
//   const [endpoint, setEndPoint] = useState("day")

//   const { data, loading, error } = UseFetchData(`/trending/movie/${endpoint}`)

//   const onTabChange = (tab) => {
//     setEndPoint(tab === 'day' ? "day" : tab === 'week' ? "week" : "month");
//   }

//   return (
//     <div className='carouselSection'>
//       <ContentWrapper>
//         <span className='carouselTitle'>
//           Trending
//         </span>
//         <SwitchTabs data={["day", "week"]} onTabChange={onTabChange} />
//       </ContentWrapper>
//       <Carousel data={data?.results} loading={loading}/>
//     </div>
//   )
// }

// export default Trending
