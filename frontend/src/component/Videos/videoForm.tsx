import React,  { ChangeEvent, FormEvent, useState, useEffect } from "react";
import {useHistory, useParams} from 'react-router-dom'
import { Video } from './video';
import {toast} from 'react-toastify'
import * as videoService from './videoService';
import 'react-toastify/dist/ReactToastify.css';

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement >;

interface Params {
  id:string
}

const VideoForm = () => {
  const history = useHistory();
  const params  = useParams<Params>();

  const initialState = {
    title: "",
    description: "",
    url: "",
  };

  const [video, setVideo] = useState<Video>(initialState);

     const HandleInputChange = (e:InputChange) =>{
    

         setVideo({...video, [e.target.name]: e.target.value})
     }
     
     const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
       e.preventDefault();

       if(!params.id){
        await videoService.createVideo(video);
        toast.success('New Video added')
        setVideo(initialState)
       }else{
         await videoService.updateVideo(params.id,video)
       }

       history.push('/')
     }
    
     const getVideo  = async (id:string)=>{
       const res = await videoService.getVideo(id);
       const { title, description, url } = res.data;
       setVideo({title, description, url});
     }
     useEffect(() => {
        if( params.id ) getVideo(params.id);
     }, [params.id ])

  return (
    <div>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="card">
            <div className="card-body">
              <h3>New Video</h3>
              <form onSubmit={HandleSubmit} >
                  <div className="form-group">
                  <input
                  type="text"
                  name="title"
                  placeholder="Write a title for this video"
                  className="form-control"
                  onChange={HandleInputChange}
                  autoFocus
                  value={video.title}
                />
                  </div>
                  <div className="form-group">
                      <input type="text" name="url" 
                      placeholder="https://somesite.com" 
                      className="form-control"
                      onChange={HandleInputChange}
                      value={video.url}
                      />

                  </div>
                  <div className="form-goup">
                      <textarea name="description" rows={3} 
                      className="form-control"
                      onChange={HandleInputChange}
                      placeholder="Write a description"
                      value={video.description}
                      ></textarea>
                  </div>
                  {
                    params.id ? 
                        <button className="btn btn-info">Update Video</button>
                        :
                        <button className="btn btn-primary">Create Video</button>
                  }


                  
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoForm;
