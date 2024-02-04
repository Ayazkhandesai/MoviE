import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/Content-Wrapper/ContentWrapper.jsx";
import UseFetchData from "../../../Hooks/UseFetch.jsx";
import Genre from "../../../components/Genres/Genre.jsx";
import CircleRating from "../../../components/CircleRating/Circle.jsx";
import Img from "../../../components/LazyLoader_img/img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "./Playbtn.jsx";
import VideoPopup from "../../../components/VideoPopUp/VideoPopUp.jsx";

const DetailsBanner = ({ video = [], crew = [] }) => {
    const [show, setShow]=useState(false)
    const [videoId,setVideoId]=useState("")

    const { mediaType, id } = useParams()
    const { data, loading } = UseFetchData(`/${mediaType}/${id}`)
    const { url } = useSelector(state => state.home)


    const _genres = data?.genres?.map((g) => g.id)
    // const _crew = crew || (data && data.credits.crew);
    const director = crew?.filter(val => {
        return val.job === 'Director' || val.job === 'Directing Department';
    })
    const writer = crew?.filter(val => {
        return val.job === 'Writer' || val.job === "Screenplay" || val.job == "Writing" || val.job == "story";
    })

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {
                        !!data && (
                            <div>
                                <div className="backdrop-img">
                                    <Img src={url?.backdrop + data?.backdrop_path} />
                                </div>
                                <div className="opacity-layer">

                                </div>
                                <ContentWrapper>
                                    <div className="content">
                                        <div className="left">
                                            {data.poster_path ? (
                                                <Img src={url.poster + data.poster_path} alt={data.title || data.name} className="posterImg" />
                                            ) : (
                                                <Img src={PosterFallback} alt="" className="posterImg" />
                                            )}
                                        </div>
                                        <div className="right">
                                            <div className="title">
                                                {`${data.name || data.title} (${dayjs(data.release_date).format("YYYY")})`}
                                            </div>
                                            <div className="subtitle">
                                                {data?.tagline}
                                            </div>
                                            <Genre data={_genres} />
                                            <div className="row">
                                                <CircleRating rating={data?.vote_average.toFixed(1)} />
                                                <div className="playbtn" onClick={() => {
                                                    setShow(true)
                                                    setVideoId(video?.key) }}>
                                                    <PlayIcon />
                                                    <span className="text">Watch Trailer</span>
                                                </div>
                                            </div>
                                            <div className="overview">
                                                <div className="heading">
                                                    Overview
                                                    <div className="description">
                                                        {data?.overview}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="info">
                                                {
                                                    data.status &&
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            status:{" "}
                                                        </span>
                                                        <span className="text">
                                                            {data.status}
                                                        </span>
                                                    </div>
                                                }
                                                {
                                                    data.release_date &&
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            Released:{" "}
                                                        </span>
                                                        <span className="text">
                                                            {dayjs(data.release_date).format("MMM  DD, YYYY")}
                                                        </span>
                                                    </div>
                                                }
                                                {
                                                    data.runtime &&
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            Run Time:{" "}
                                                        </span>
                                                        <span className="text">
                                                            {toHoursAndMinutes(data.runtime)}
                                                        </span>
                                                    </div>
                                                }
                                            </div>
                                            {
                                                director.length > 0 && (
                                                    <div className="info">
                                                        <span className="text bold">
                                                            Producer: {" "}
                                                        </span>
                                                        <span className="text">
                                                            {director.map((d, i) => (
                                                                <span key={i}>
                                                                    {d.name}
                                                                    {director.length - 1 !== i ? ", " : ""}
                                                                </span>
                                                            ))}
                                                        </span>
                                                    </div>
                                                )
                                            }
                                            {
                                                writer.length > 0 && (
                                                    <div className="info">
                                                        <span className="text bold">
                                                            Writer: {" "}
                                                        </span>
                                                        <span className="text">
                                                            {director.map((d, i) => (
                                                                <span key={i}>
                                                                    {d.name}
                                                                    {writer.length - 1 !== i ? ", " : ""}
                                                                </span>
                                                            ))}
                                                        </span>
                                                    </div>
                                                )
                                            }
                                            {
                                                data?.created_by?.length > 0 && (
                                                    <div className="info">
                                                        <span className="text bold">
                                                            Creator:{" "}
                                                        </span>
                                                        <span className="text">
                                                            {data?.created_by?.map((d, i) => (
                                                                <span key={i}>
                                                                    {d.name}
                                                                    {data?.created_by?.length - 1 !== i ? ", " : ""}
                                                                </span>
                                                            ))}
                                                        </span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <VideoPopup  videoId={videoId} setVideoId={setVideoId} show={show} setShow={setShow}/>
                                </ContentWrapper>
                            </div>
                        )
                    }
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;