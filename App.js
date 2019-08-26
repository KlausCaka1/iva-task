import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import Modal from './Modal';
import Geocode from 'react-geocode';
import Stores from './Stores.js';

Geocode.setApiKey("AIzaSyAIFFT8HrgNCdHmQu21BKWXINOlq3fDeYw");
  
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isShowing: false,
        dyqan: '',
        locations: [],
        dyqanet: Stores,
    }
    this.handleChange = this.handleChange.bind(this);
}

handleChange(event) {
  this.setState({dyqan: event.target.value});
}
openModalHandler = () => {
    this.setState({
        isShowing: true
    });
}

closeModalHandler = () => {
    this.setState({
        isShowing: false
    });
    Geocode.fromAddress(this.state.dyqan).then(
      response => {
        console.log(response.results[0].geometry.location);
        this.state.locations.push(response.results[0].geometry.location);
        console.log(this.state.locations);
        console.log(this.state.dyqanet)
      },
      error => {
        console.error(error);
      } 
    )
}
displayMarker = () => {
  return this.state.locations.map((locations, index) => {
    return <Marker key={index} id={index} position={{
     lat: locations.lat,
     lng: locations.lng
   }}
   onClick={() => console.log("You clicked me!")} />
  })
}
displayExitStores = () => {
  return this.state.dyqanet.map((dyqanet, index) => {
    return <Marker key={index} id={index} position={{
      lat: dyqanet.lat,
      lng: dyqanet.lng
    }}
    onClick={() => console.log("You clicked me!")} />
  })
}
  render(){
    return (
    <div>
    <button
    onClick={this.openModalHandler}>
       Shto Dyqan
    </button>
     
      <Map
       google = {this.props.google}
       zoom={15}
       style={mapStyles}
       initialCenter={{ lat: 41.3275, lng: 19.8187 }}
      > 
      {this.displayMarker()}
      {this.displayExitStores()}
      </Map>
      <Modal
            className="modal"
            show={this.state.isShowing}
            close={this.closeModalHandler}>
            Adresa e Dyqanit : 
            <input type="text" 
            value={this.state.dyqan}
            onChange={this.handleChange}
            id="Adresa"/>
      </Modal>
      
    </div>
    );
  }
}

const mapStyles = {
  width: '100%',
  height: '100%'
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAIFFT8HrgNCdHmQu21BKWXINOlq3fDeYw'
})(App);