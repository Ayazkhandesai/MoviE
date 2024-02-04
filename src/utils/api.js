import axios from "axios"

const BASE_URL="https://api.themoviedb.org/3/"

const TMDB_Token=import.meta.env.VITE_APP_TMDB_TOKEN

const headers={
    Authorization:"bearer "+TMDB_Token,
}

export const fetchDataFromAPI=async (url,params) =>{
        try {
            console.log(BASE_URL+url)
            const {data}=await axios.get(BASE_URL+url,{
                headers,
                params
            })
            return data
        } catch (error) {
            console.log(error)
        }
}