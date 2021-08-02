import React, { useEffect, useState } from 'react'
import * as videoService from './videoService'
import {Video} from './video'
import VideoItem from './videoItem'


const VideoList = () =>{
    const [videos,setVideos] = useState<Video[]>([])

    const loadVideos = async ()=>{
          const res = await videoService.getVideos()
          const formatedVideo = res.data.map(video =>{
             return {
               ...video,
               createdAt: video.createAt ? new Date(video.createAt): new Date(),
               updateAt: video.updateAt ?  new Date(video.updateAt): new Date(),
             }
           }).sort((a,b)=> b.createdAt.getTime() - a.createdAt.getTime());


          setVideos(formatedVideo);
   }


   useEffect(() => {       
      loadVideos()
   }, [])

    return(
        <div className="row">
           {videos.map((video) =>{
             return  <VideoItem video={video} key={video._id} loadVideos = {loadVideos} />
           })}
        </div>
    )

}
export default VideoList