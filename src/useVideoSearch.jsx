import { useState, useEffect } from "react"
import axios from 'axios'

const useVideoSearch = (query, pageNumber) => {


    // API

    const apiUrl = process.env.REACT_APP_API_URL
    const apiKey = process.env.REACT_APP_API_KEY
    const apiHost = process.env.REACT_APP_API_HOST

    useEffect(() => {
        axios.request({
            method: 'GET',
            url: `${apiUrl}/search`,
            params: { token: pageNumber , geo: 'IN' },
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': apiHost
            }
        })
            .then(function (response) {
                console.log(response.data);
            }).catch(function (error) {
                console.error(error);
            });

    }, [query, pageNumber])

    return null

}

export default useVideoSearch