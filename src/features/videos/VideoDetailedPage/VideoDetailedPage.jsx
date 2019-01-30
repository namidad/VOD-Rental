import React, { Component } from 'react'
import {Segment, Loader, Image} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export class VideoDetailedPage extends Component {

    state = {
        videoID: this.props.match.params.id,
        movie: null,
    }


    handleDeleteFilm = (e) => {
        e.preventDefault();
        const link="/videos/"+this.state.videoID;
        fetch(link,{method: 'DELETE'})
        .then(res=> res.json())
        .catch(err=>console.log(err));
        this.props.history.push('/videos');
    }



  render() {
    let film;
    let ready=false;
    this.props.movie.forEach(movie => {
        if(movie.MovieID==this.props.match.params.id){
            film=movie;
            ready=true;
        }
    });
    if(ready){
        return (
            <div className={"singleVideo"}>
              <img  src={film.ImgSrc} />
              <div className="videoContainer">
                  <div>
                    <h1>{film.Title}</h1>
                    <h2>{film.ReleaseYear}</h2>
                    <p>INFORMACJE</p>
                    <span>Gatunek: </span> {film.MovieGenre}<p></p>
                    <span>Rezyser</span> {film.Director}<p></p>
                    <p>O FILMIE</p>
                    <span>{film.Description}</span>
                  </div>
                  <div>
                      {this.props.isAdmin ? 
                        <Button.Group>
                            <Button color="green" as={Link} to={`/editVideo/${film.MovieID}`}>Edytuj</Button>
                            <Button.Or />
                            <Button color="red" onClick={this.handleDeleteFilm}>Usun</Button>
                        </Button.Group> 
                        :
                        <Button color="orange" animated='fade'>
                         <Button.Content visible>Kup dostęp do filmu!</Button.Content>
                         <Button.Content hidden>{film.Price} zł!</Button.Content>
                        </Button>
                        }            
                  
                  </div>
                  
                  
              </div>
            </div>
          )
        
    } else {
        return (
            <Segment>
            <Loader active />
        
            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
          </Segment>
        )
    }
    
}
}

const mapStateToProps=(state)=>{
    return{
        movie: state.videos.videos,
        isAdmin: state.user.isAdmin
    }
}

export default connect(mapStateToProps)(VideoDetailedPage)
