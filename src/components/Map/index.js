import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MapGL, { Marker } from 'react-map-gl';
import PropTypes from 'prop-types';
import { Creators as ModalActions } from '../../store/ducks/modal';

import './styles.css';

class Main extends Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -23.40953819556508,
      longitude: -51.927934970567584,
      zoom: 13,
    },
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const { viewport } = this.state;
    this.setState({
      viewport: {
        ...viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  handleMapClick = async (e) => {
    const [longitude, latitude] = e.lngLat;
    const { showModal } = this.props;

    await showModal({ latitude, longitude });
  };

  render() {
    const { usersLocation } = this.props;
    const { viewport: viewportState } = this.state;
    return (
      <MapGL
        className="map"
        {...viewportState}
        onClick={this.handleMapClick}
        mapStyle="mapbox://styles/mapbox/basic-v9"
        mapboxApiAccessToken="pk.eyJ1IjoiY3NvcmxhbmRpIiwiYSI6ImNqanN1eHIwczAwejIzd2xwazg4MDc4OTUifQ.E7SBVt_fFh5kV26b21ipwg"
        onViewportChange={viewport => this.setState({ viewport })}
      >
        {usersLocation.data.map(user => (
          <Marker
            latitude={user.cordinates.latitude}
            longitude={user.cordinates.longitude}
            key={user.id}
          >
            <img className="avatar" alt={`${user.name} Avatar`} src={user.avatar} />
          </Marker>
        ))}
      </MapGL>
    );
  }
}

Main.propTypes = {
  usersLocation: PropTypes.shape({
    cordinates: PropTypes.oneOfType([
      PropTypes.oneOf([null]),
      PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
      }),
    ]),
    name: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  showModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  usersLocation: state.usersLocation,
});

const mapDispatchToProps = dispatch => bindActionCreators(ModalActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
