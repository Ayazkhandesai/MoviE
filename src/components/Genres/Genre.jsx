import React from 'react'
import { useSelector } from 'react-redux'
import "./style.scss"


function Genre({ data }) {
    const { genres } = useSelector(state => state.home)

    data = data.slice(0, 2)
    return (
        <div className='genres'>
            {
                data?.map(val => {
                    return (
                        <div key={val} className='genre'>
                            {genres[val]?.name}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Genre
