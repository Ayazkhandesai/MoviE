import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.scss'
import UseFetchData from '../../../Hooks/UseFetch'
import { useSelector } from 'react-redux'
import Img from '../../../components/LazyLoader_img/Img'
import ContentWrapper from '../../../components/Content-Wrapper/ContentWrapper'

const HeroBanner = () => {


  const [backround, setBackground] = useState("")
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const { url } = useSelector((state) => state.home)


  const { data, loading } = UseFetchData('/movie/upcoming')


  // const

  const searchQueryHandler = (event) => {
    if (event.key == "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }

  useEffect(() => {
    const bg = data?.results?.[Math.floor(Math.random() * data?.results?.length)];
    const urlimg = url.backdrop + "" + bg?.backdrop_path
    setBackground(urlimg)
  }, [data])

  return (
    <div className="heroBanner">
      {!loading &&
        <div className="backdrop-Img">
          <Img src={backround} />
        </div>
      }
      <div className="opacity-layer">

      </div>
      <ContentWrapper>
        <div className="wrapper">
          <div className="heroBannerContent">
            <span className='title'>WelCome </span>
            <span className='subTitle'>Millions of Movies, TV Shows and People to discover Explore now </span>
            <div className="searchInput">
              <input type="text" placeholder='Search For Movie or Tv Shows....s' onKeyUp={searchQueryHandler} onChange={(e) => { setQuery(e.target.value) }} />
              <button >Search</button>
            </div>
          </div>
        </div>
      </ContentWrapper>


    </div>
  )
}

export default HeroBanner
