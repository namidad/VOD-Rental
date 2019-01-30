import React, { Component } from "react";
import VideoDashboard from "../../features/videos/VideoDashboard/VideoDashboard";
import VideoDetailedPage from '../../features/videos/VideoDetailedPage/VideoDetailedPage';
import NavBar from "../../features/nav/NavBar/NavBar";
import { Container } from "semantic-ui-react";
import { Route, Switch } from 'react-router-dom';
import VideoForm from '../../features/videos/VideosForm/VideosForm'
import EditVideoForm from '../../features/videos/VideosForm/EditVideoForm'
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import HomePage from '../../features/home/HomePage';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={HomePage}/>
        </Switch>

        <Route 
        path="/(.+)" 
        render={() => (
          <div>
          <NavBar />
          <Container className="main">
            <Switch>
              <Route path='/videos' component={VideoDashboard}/>
              <Route path='/video/:id' component={VideoDetailedPage}/>
             <Route path='/profile/:id' component={UserDetailedPage}/>
              <Route path='/settings' component={SettingsDashboard}/>
              <Route path='/addVideo' component={VideoForm}/>
              <Route path='/editVideo/:id' component={EditVideoForm}/>
              
            </Switch> 
          </Container>
          </div>
        )} />
      </div>
    );
  }
}

export default App;
