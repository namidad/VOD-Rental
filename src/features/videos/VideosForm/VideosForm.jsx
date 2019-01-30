import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Segment, Form, Button } from 'semantic-ui-react';
import { Message } from 'semantic-ui-react'

class VideosForm extends Component {

  state = {
    video: {
      title: '',
      director:'',
      year: 0,
      genre: '',
      language: '',
      price: 0,
      image: '',
      description:''
    },
    failed:false,
  }

  onFormSubmit = (evt) => {
    evt.preventDefault();
    const {video}=this.state;
    console.log(video)
    if(
      video.title.length>0 &&
      video.director.length>0 &&
      video.genre.length >0 &&
      video.language.length>0 &&
      video.image.length>0 &&
      video.description.length>0 &&
      video.year>=1000 &&
      video.year<10000 &&
      video.price>0
      ) {


        fetch('/addVideo',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'MovieID': 0,
           'Title' : video.title,
           'Director' : video.director,
           'ReleaseYear': video.year,
           "MovieGenre" : video.genre,
           "MovieLanguage": video.language,
           'Price' : video.price,
           'ImgSrc' : video.image,
           'Description' : video.description
          })})
        .then(response => response.json())
        .catch(err=>console.log(err));


        this.props.history.push('/videos');
      } else {
        this.setState({
          failed: true,
        })
      }
    
  }

  onInputChange = (evt) => {
    const newEvent = this.state.video;
    newEvent[evt.target.name] = evt.target.value;
    this.setState({
      video: newEvent
    })
  }

  render() {

    const {video} = this.state;
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Tytul filmu</label>
            <input name='title' onChange={this.onInputChange} value={video.title} placeholder="Film title" />
          </Form.Field>
          <Form.Field>
            <label>Rezyser</label>
            <input name='director' onChange={this.onInputChange} value={video.date} placeholder="Film director" />
          </Form.Field>
          <Form.Field>
            <label>Rok produkcji</label>
            <input name='year' onChange={this.onInputChange} value={video.city} placeholder="Release year" />
          </Form.Field>
          <Form.Field>
            <label>Podaj rodzaj filmu</label>
            <input name='genre' onChange={this.onInputChange} value={video.venue} placeholder="Movie genre" />
          </Form.Field>
          <Form.Field>
            <label>Podaj jezyk filmu</label>
            <input name='language' onChange={this.onInputChange} value={video.hostedBy} placeholder="Movie language" />
          </Form.Field>
          <Form.Field>
            <label>Podaj cene</label>
            <input name='price' onChange={this.onInputChange} value={video.hostedBy} placeholder="Price" />
          </Form.Field>
          <Form.Field>
            <label>Podaj URL do plakatu</label>
            <input name='image' onChange={this.onInputChange} value={video.hostedBy} placeholder="Movie image" />
          </Form.Field>
          <Form.Field>
            <label>Podaj opis filmu</label>
            <input name='description' onChange={this.onInputChange} value={video.hostedBy} placeholder="Movie description" />
          </Form.Field>

          <Button.Group>
            <Button type="submit" positive>Zaakceptuj</Button>
            <Button.Or />
            <Button color="red" onClick={this.props.history.goBack}>Anuluj</Button>
          </Button.Group>
        </Form>

        {this.state.failed &&
        <Message negative>
        <Message.Header>Blad podczas tworzenia filmu</Message.Header>
        <p>Popraw dane!</p>
      </Message>
        }

      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAdmin: state.user.isAdmin
  }
}

export default connect(mapStateToProps)(VideosForm);
