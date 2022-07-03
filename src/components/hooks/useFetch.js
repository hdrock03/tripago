import { useEffect, useState } from "react"

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending , setIsPending]= useState(false) // to show isPending message we need to first initialize it to false
    const [error , setError] = useState(null)


    useEffect( () => {
        const controller = new AbortController()

        const fetchdata = async () =>{

         setIsPending(true) // yaha pe true kiye h qki show krna h jb data fetch ho rha hga tb 
        
          try {
            
            const res = await fetch(url , {signal: controller.signal}) 
            console.log(res);
            const json = await res.json() 

            setIsPending(false) // false kiye qki data avi tk fetch ho chuka h 
            setData(json)
            setError(null) // qki agr phle kbhi error feka hga to usko yeh null kr de
          } catch(err) {
            if(err.name === 'AbortError'){
                console.log('fetch was aborted');
            }else{
                setIsPending(false)
                setError('Could not fetch the data')
            }
            
          }

        }

        fetchdata()

        return () => {
            controller.abort()
        }
    } , [url])

    return {data: data , isPending , error}

}

export default useFetch;