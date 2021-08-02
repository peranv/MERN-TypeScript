import React from 'react'
import { Video } from './video'
import ReactPlayer from 'react-player'
import {useHistory} from 'react-router-dom';
import * as videoService from './videoService'
import './VideoItem.css';

interface Props {
    video: Video,
    loadVideos: () => void;
}


const VideoItem = ({video, loadVideos}:Props) => {

    const History = useHistory();

     const handleDelete = async(id: string) =>{
        await videoService.deleteVideo(id);
        loadVideos();
     }

    return (
        <div className="col-6 col-md-4">
            <div className="card video-card"  style={{width: '18rem'}} >
          
                <div className="card-body  ">
                    <div className="d-flex justify-content-between">
                 <h5 className="card-title" onClick={()=> History.push(`/update/${video._id}`)} >{video.title}</h5>
                 <span className="text-danger" onClick={()=> video._id && handleDelete(video._id)}>X</span>
          </div>
                   <p className="card-text">{video.description}</p>
           </div>
           <ReactPlayer className="w-auto" style={{height: 50, width: 50}}  url={video.url} />
        </div>


        
          
           
    </div>
    );
};

export default VideoItem
