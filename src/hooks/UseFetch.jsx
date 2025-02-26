import { useEffect, useState } from 'react'

export default function UseFetch(url) {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchThis = async () => {
            try {
                const fetchResponse = await fetch(`${url}`)
                if (!fetchResponse.ok){
                    throw new Error(`${fetchResponse.status}: ${fetchResponse.statusText}`);

                }

                const fetchedData = await fetchResponse.json()
                setData(fetchedData[0])
            }
            catch (error) {
                setError(error)
            }

        }
        fetchThis()
    }, [url])

    return { data, error }
}
