import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../utils/api";

export default function UseFetchData(url) {
    const [data, setData] = useState('')
    const [loading, SetLoading] = useState(null)
    const [error, setError] = useState('')


    useEffect(() => {
        try {
            SetLoading(true)
            fetchDataFromAPI(url).then((res) => {
                setData(res)
                SetLoading(false)
            })
        } catch (error) {
            setError(error)
            SetLoading(false)
        }
    }, [url])

    return { data, loading, error }

}