import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import './RowPost.css'
import axios from '../../axios'
import { API_KEY, imageUrl } from '../../Constants/constants'
function RowPost(props) {
    const [movies, setMovies] = useState([])
    const [urlId,setUrlId] = useState('')
    useEffect(()=>{
        axios.get(props.url).then(response=>{
            console.log(response.data)
            setMovies(response.data.results)
        }).catch(err=>{
            // alert('Network error')
        })
    },[])
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    }
const handleMovie = (id)=>{
    axios.get(`/movie/${id}/videos?language=en-US&api_key=${API_KEY}`).then(response=>{
        console.log(response.data)
        if(response.data.results.length!==0){
            setUrlId(response.data.results[0])
        }else{
            console.log('Array empty')
        }   
    })

}

  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className="posters">
            {movies.map((movie)=>
                <img onClick={() => handleMovie(movie.id)} className={props.isSmall ? 'smallPoster' : 'poster'} alt='poster' src={`${imageUrl + movie.backdrop_path}`} />
            )}
        </div>

        {urlId&& <YouTube opts={opts} videoId={urlId.key}/>}
    </div>
  )
}

export default RowPost