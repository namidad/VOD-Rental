import React, { Component } from 'react'
import  {Button} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class EventListItem extends Component {
  render() {

    const {video} = this.props;

    return (
      <div className={'film'}>
             <img  src={video.ImgSrc} />
             <Button as={Link} to={`/video/${video.MovieID}`} color="teal" fluid content="Zobacz więcej" />
      </div>
    )
  }
}

export default EventListItem;