import React, { useRef } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import Img from "../LazyLoader_img/Img";
import PosterFallback from "../../assets/no-poster.png";
import ContentWrapper from "../Content-Wrapper/ContentWrapper";
import CircleRating from "../CircleRating/Circle";
import Genre from "../Genres/Genre";

import "./style.scss";

const Carousel = ({ data, loading,endpoint,title }) => {
    console.log("ENDNDNDN "+endpoint)
    const { url } = useSelector(state => state.home)
    const navigate = useNavigate()

    const carouselContainer = useRef();
    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);
        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };
    const skItems = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skleteton">
                    <div className="textBlock">
                        <div className="title skleteton"></div>
                        <div className="date skleteton"></div>
                    </div>
                </div>
            </div>


        )
    }

    return (
        <div className="carousel"  >
            <ContentWrapper>
            {title && <div className="carouselTitle">{title}</div> }
                <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => navigation("left")} />
                <BsFillArrowRightCircleFill className="carouselRighttNav arrow" onClick={() => navigation("right")} />
                {
                    !loading ?
                        <div className="carouselItems" ref={carouselContainer}>
                            {data?.map(items => {
                                const posterurl = items?.poster_path ? url.poster + items?.poster_path : PosterFallback
                                console.log(items.media_type)
                                return (
                                    <div key={items?.id} className="carouselItem" onClick={()=>{navigate(`/${items?.media_type ?items?.media_type : endpoint}/${items.id}`)}}>
                                        <div className="posterBlock">
                                            <Img src={posterurl} />
                                            <CircleRating rating={items?.vote_average.toFixed(1)} />
                                            <Genre data={items.genre_ids} />
                                        </div>
                                        <div className="textBlock">
                                            <span className="title">
                                                {
                                                    items.title || items.name
                                                }
                                            </span>
                                            <span className="title">
                                                {
                                                    dayjs(items?.release_date).format("MMM D, YYYY")
                                                }
                                            </span>
                                        </div>
                                    </div>
                                )
                            }
                            )}
                        </div>
                        : <div className="loadingSkeleton">
                            {skItems()}
                            {skItems()}
                            {skItems()}
                            {skItems()}
                            {skItems()}
                        </div>
                }
            </ContentWrapper>
        </div>
    )
}

export default Carousel
