import React, { Component } from 'react'
import VideoListItem from './VideoListItem'

class VideoList extends Component {
  render() {

    const { videos, deleteEvents } = this.props;

    return (
      <div className="filmGrid">
        { videos.map((video)=>(
          <VideoListItem 
          deleteEvents={deleteEvents} 
          key={video.MovieID} 
          video={video} 
         />
        ))}
        
      </div>
    )
  }
}

export default VideoList