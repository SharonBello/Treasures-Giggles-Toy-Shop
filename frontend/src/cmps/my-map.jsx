import { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

class _MyMap extends Component {
  state = {
    center: {
      lat: 32.087959652432254,
      lng: 34.775258775958996,
    },
    isInfoWindowOn: false,
  };

  acordionBranchContent = [
    {
      heading: 'Tel Aviv Branch',
      position: { lat: 32.09151422942391 , lng: 34.77710737828437 },
      content: 'Dizengoff/Arlozorov ',
      tel: '03-6779545',
      web: 'www.toys.com',
      open: 'Sunday - Thursday: 8am - 8pm',
    },
    {
      heading: 'Jerusalem Branch',
      position: { lat: 31.750253737063083, lng:35.178430903886834 },
      content: 'Derech Aharon Shulov 3',
      tel: '03-9436284 ',
      web: 'www.toys.com',
      open: 'Sunday - Thursday: 8am - 5pm',
    },
    {
      heading: ' New York Branch',
      position: { lat: 40.748987214564295, lng: -73.98558535070848 },
      content: 'Vornado Realty Trust, 7 W 34th St #60, New York, NY 10001',
      tel: '+1 855-698-1154',
      web: 'www.toys.com',
      open: 'Monday - Thursday: 10am - 8pm',
    },
  ];

  onMapClicked = (props, map, ev) => {
    this.setState({ center: { lat: ev.latLng.lat(), lng: ev.latLng.lng() } });
  };

  onMarkerClicked = () => {
    this.setState({ isInfoWindowOn: true });
  };

  onInfoWindowClose = () => {
    this.setState({ isInfoWindowOn: false });
  };

  onBranchClick = (idx) => {
    this.setState({
      isInfoWindowOn: true,
      currBranchSelected: this.acordionBranchContent[idx].position,
      currBranchDetails: this.acordionBranchContent[idx].heading,
    });
  };

  render() {
    const style = {
      width: '%',
      height: '500px',
      position: 'relative',
      margin: '20px',
    };

    return (
      <>
      <div className='my-map' >
      {/* <div className='my-map' style={{ height: '100vh', width: '100%' , marginTop: '200px' , marginLeft: '10%'}}> */}
        <Map 
          google={this.props.google}
          zoom={10}
          initialCenter={{ lat: 32.02393895923443, lng: 34.78419219869878 }}
          onClick={this.onMapClicked}
          center={{ lat: 32.02393895923443, lng: 34.78419219869878 }}
          containerStyle={style}
        >
          {this.acordionBranchContent.map((currBranch, idx) => (
            <Marker
              key={idx}
              position={currBranch.position}
              name={currBranch.heading}
              onClick={this.onMarkerClicked}
            />
          ))}

          <InfoWindow
            onClose={this.onInfoWindowClose}
            position={this.state.currBranchSelected}
            visible={this.state.isInfoWindowOn}
          >
            <div>
              <h1>{this.state.currBranchDetails}</h1>
            </div>
          </InfoWindow>
        </Map>
        </div>
        <Accordion allowZeroExpanded>
          {this.acordionBranchContent.map((currBranch, idx) => (
            <AccordionItem key={idx}>
              <AccordionItemHeading
                onClick={() => this.onBranchClick(`${idx}`)}
              >
                <AccordionItemButton>{currBranch.heading}</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <h2>{currBranch.heading}</h2>
                <p>Addres: {currBranch.content}</p>
                <p>Tel: {currBranch.tel}</p>
                <p>Web: {currBranch.web}</p>
                <p>Open Hours: {currBranch.open}</p>
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </>
    );
  }
}

export const MyMap = GoogleApiWrapper({
  apiKey: 'AIzaSyBuDsJHRrULz0g9T40-e-8N7sqASaydAxI',
})(_MyMap);