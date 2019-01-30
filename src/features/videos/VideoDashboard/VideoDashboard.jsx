import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import VideoList from '../VideoList/VideoList'
import { connect } from 'react-redux'
import { addVideos } from '../../../app/reducers/videoActions'


class VideoDashboard extends Component {

    state = {
        videos: [],
    }

    componentDidMount(){
    fetch('/videos')
    .then(response => response.json())
    .then(videos => {
      this.setState({
        videos
      })
      this.props.addVideos(videos);
    })
    .catch(err=>console.log(err));

    }

    handleDeleteEvent = () => {

    }

  render() {


    const {videos } = this.state;
    return (
      <Grid>
          <Grid.Column width={10}>
            <VideoList 
            deleteEvents = {this.handleDeleteEvent} 
            videos={videos}/>
          </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    logged: state.user.isLogged
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addVideos: (videos) => dispatch(addVideos(videos))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(VideoDashboard);