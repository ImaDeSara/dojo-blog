import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null); 
    const [isPending, setIsPending] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect( () => { 
            const abortCont = new AbortController();

            setTimeout(() => {
                fetch(url, { signal : abortCont.signal } )
                    .then(res => {
                        console.log(res);
                        if (!res.ok) {
                            throw Error('Could not fetch  the data for that resource'); //this outputs when request still reaches the server but denied by server or endpoint doesn't exist
                        }
                        return res.json(); 
                    })
                    .then(data => {
                        setData(data);
                        setIsPending(false);
                        setError(null); //if we fetch data again after the request is successful then, remove the error msg
                    })
                    .catch(err => {
                        if ( err.name === 'AbortError' ) {
                            console.log('fetch aborted');
                        } else {
                            setIsPending(false);
                            setError(err.message); //catch connection/network errors where JSON server is probably turned off
                        }
                        })
            }, 1000) //1second = 1000milliseconds
            return () => abortCont.abort(); 
    }, [url]); //dependency array, useEffect only runs once in the initial render
    
    return { data, isPending, error }
}

export default useFetch;