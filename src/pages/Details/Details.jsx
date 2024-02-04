import React from 'react'
import './style.scss'

import UseFetchData from "../../hooks/UseFetch"
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './cast/Cast'
import VideosSection from './videosSection/VideosSection'
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recommendation'

const Details = () => {
  const {mediaType, id}=useParams()
  const {data, loading} = UseFetchData(`/${mediaType}/${id}/videos`)
  const {data:creditsData, loading:creditsLoading} = UseFetchData(`/${mediaType}/${id}/credits`)
  console.log("creditsData")
  console.log(data)


  return (
    <div>
        <DetailsBanner video={data?.results?.[0]} crew={creditsData?.crew}/>
        <Cast data={creditsData?.cast}  loading={creditsLoading} />
        <VideosSection data={data} loading={loading}/>
        <Similar mediaType={mediaType} id={id}/>
        <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details
