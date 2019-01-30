import React, {Component} from 'react'
import { Form, Grid, Button, Header, Segment, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { loginUser } from '../../app/reducers/userActions'

class HomePage extends Component {

  state = {
    login:'',
    password:'',
    user: {
      customerID: 0,
      personalID:0,
      login:'',
      password:'',
      vallet:0,
      name:'',
      surname:'',
      phone:'',
      email:''
    },
    users:[],
    logged: false,
    error: false,
    new: false,
    sameLogin: false
    }

  componentDidMount(){
    fetch('/customers')
    .then(response => response.json())
    .then(users => {
      this.setState({
        users
      })
    })
    .catch(err=>console.log(err));
  }

  handleLogin = (e) => {
    e.preventDefault();
    let check=false;
    this.state.users.forEach(user=>{
        if(user.Login === this.state.login
          && user.Password === this.state.password ){
            check=true;
            this.setState({
              logged: true,
            })
            let loggedUser = user;
            loggedUser.logged=true;
            this.props.loginUser(loggedUser);
            this.props.history.push('/videos');
          }
    })

    if(!check){
      this.setState({
        error: true,
      })
    } else {
      this.setState({
        error: false,
      })
    }
  } 
  
  handleLoginChange= (e)=>{
      this.setState({
        login: e.target.value
      })
  }

  handlePasswordChange= (e) =>{
    this.setState({
      password: e.target.value
    })
  }

  handleSignIn = () => {
    this.setState({
      new: !this.state.new
    })
  }

  onInputChange = (evt) => {
    const newUser = this.state.user;
    newUser[evt.target.name] = evt.target.value;
    if(evt.target.name==='login'){
      this.setState({
        user: newUser,
        sameLogin: false,
      })
    }  else {
      this.setState({
        user: newUser
            })
    }
    
  }


  onFormSubmit = (evt) => {
    evt.preventDefault();

    const {user}=this.state;
    if(user.login.length >0 &&
      user.password.length >0 &&
      user.name.length >0 &&
      user.surname.length >0 &&
      user.phone>0 &&
      user.email.length>0
      ){
        let check=false;
        this.state.users.forEach(users=>{
          if(users.Login.toUpperCase() === user.login.toUpperCase()){
            check=true;
              this.setState({
                sameLogin: true,
              })
            } else if(users.Email === user.email){
              check=true;
              this.setState({
                sameEmail: true,
              })
            }
      })

      if(!check){

        fetch('/combined',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'CustomerID': 0,
           'PersonalID' : 0,
           'Login' : user.login,
           'Password': user.password,
           "ValletBalance" : 0,
           'Name' : user.name,
           'Surname' : user.surname,
           'PhoneNumber' : user.phone,
           'Email' : user.email
         })})
        .then(response => response.json())
        .catch(err=>console.log(err));

        this.setState({
          login:'',
          password:'',
          user: {
          customerID: 0,
          personalID:0,
          login:'',
          password:'',
          vallet:0,
          name:'',
          surname:'',
          phone:'',
          email:''
          },
          logged: false,
          error: false,
          new: false,
          sameLogin: false
        })

        fetch('/customers')
        .then(response => response.json())
        .then(users => {
           this.setState({
             users
            })
        })
        .catch(err=>console.log(err));

      }

      }
  }

  render(){
    const {user}=this.state;
    if(!this.props.isLogged && !this.state.new){
      return (
        <div>
              <div className="ui inverted vertical masthead center aligned segment">
                <div className="ui text container">
                  <h1 className="ui inverted stackable header">
                    <img
                      className="ui image massive"
                      src="/assets/logo.png"
                      alt="logo"
                    />
                    <div className="content">SkoSal</div>
                  </h1>
                  <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
          Login to your account
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input onChange={this.handleLoginChange} fluid icon='user' iconPosition='left' placeholder='Login' />
              <Form.Input
                onChange={this.handlePasswordChange}
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
              />
  
              <Button onClick={this.handleLogin} color='teal' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
  
  
          {this.state.error && <Message negative>
            <Message.Header>Blad logowania</Message.Header>
            <p>Bledny login lub haslo. Sprobuj ponownie!</p>
          </Message> }
  
          <Message>
            New to us? 
            <Button onClick={this.handleSignIn} color='teal' fluid size='large'>
                Sign in
              </Button>
          </Message>
        </Grid.Column>
      </Grid>
                </div>
              </div>
            </div>
      )
    } else if (this.state.new && !this.props.isLogged){
      return (
        <div>
              <div className="ui inverted vertical masthead center aligned segment">
                <div className="ui text container">
                  
                  <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
             Signup
          </Header>
          <Form size='large' onSubmit={this.onFormSubmit}>
            <Segment stacked>
            <Form.Field>
              <label>Imie</label>
              <input name='name' onChange={this.onInputChange} value={user.name} placeholder="Podaj imie" />
            </Form.Field>
            <Form.Field>
              <label>Nazwisko</label>
              <input name='surname' onChange={this.onInputChange} value={user.surname} placeholder="Podaj nazwisko" />
            </Form.Field>
            <Form.Field>
              <label>Numer telefonu</label>
              <input name='phone' onChange={this.onInputChange} value={user.phone} placeholder="Podaj swoj numer telefonu" />
            </Form.Field>
            <Form.Field>
              <label>Login</label>
              <input name='login' onChange={this.onInputChange} value={user.login} placeholder="Podaj nowy swoj login" />
            </Form.Field>
            <Form.Field>
              <label>Haslo</label>
              <input name='password' type={'password'} onChange={this.onInputChange} value={user.password} placeholder="Wpisz hasło" />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input type='email' name='email' onChange={this.onInputChange} value={user.email} placeholder="Podaj email" />
            </Form.Field>

            <Button.Group>
              <Button type="submit" positive>Zaakceptuj</Button>
              <Button.Or />
              <Button color="red" onClick={this.handleSignIn}>Anuluj</Button>
            </Button.Group>
            </Segment>
            {this.state.sameLogin && <Message negative>
            <Message.Header>Blad rejestracji</Message.Header>
            <p>Wybrany login jest juz zajety!</p>
          </Message> }
          


          </Form>


        </Grid.Column>
      </Grid>
                </div>
              </div>
            </div>
      )




    } else 
      {
      this.props.history.push('/videos');
      return null;
    }
    }
    
}

const mapStateToProps = (store) => {
  return {
    isLogged: store.user.isLogged
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    loginUser: (login)=> dispatch(loginUser(login))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);