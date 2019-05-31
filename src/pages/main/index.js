import React, { Fragment } from 'react';

import LeftBar from '../../components/LeftBar';
import AddUserLocation from '../../components/AddUserLocation';
import Map from '../../components/Map';

const Main = () => (
  <Fragment>
    <Map />
    <LeftBar />
    <AddUserLocation />
  </Fragment>
);

export default Main;
