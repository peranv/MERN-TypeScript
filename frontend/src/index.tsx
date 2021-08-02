import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import  {BrowserRouter, Route, Switch }  from 'react-router-dom';
import VideoList from './component/Videos/videoslist';
import videoForm from './component/Videos/videoForm';
import {ToastContainer} from 'react-toastify'
import Navbar from './component/Navbar/Navbar';

import 'react-toastify/dist/ReactToastify.css';
import 'bootswatch/dist/pulse/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>   

         <Navbar />
        <div className="container px-4">
            <Switch>
                 <Route exact={true} path="/" component={VideoList} />   
                 <Route path="/new-video" component={videoForm} />
                 <Route path="/update/:id" component={videoForm} />
             </Switch>  
             <ToastContainer/>
          </div>     
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
