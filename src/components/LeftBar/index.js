import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UsersLocationActions } from '../../store/ducks/usersLocation';

import './styles.css';

const LeftBar = ({ usersLocation, removeUserLocation }) => (
  <div className="leftbar">
    <ul>
      {usersLocation.data.map(user => (
        <li key={user.id}>
          <div>
            <img src={user.avatar} alt={`${user.name} avatar`} />
            <div className="user-info">
              <strong>{user.name}</strong>
              <span>{user.login}</span>
            </div>
            <button type="submit" onClick={() => removeUserLocation(user)}>
              <i className="fa fa-fw fa-times-circle remove" />
            </button>
            <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer">
              <i className="fa fa-fw fa-angle-right go-to-page" />
            </a>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

LeftBar.propTypes = {
  usersLocation: PropTypes.shape({}).isRequired,
  removeUserLocation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  usersLocation: state.usersLocation,
});

const mapDispatchToProps = dispatch => bindActionCreators(UsersLocationActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LeftBar);
