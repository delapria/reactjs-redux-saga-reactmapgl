import { all, takeLatest } from 'redux-saga/effects';
import { Types as UserLocationTypes } from '../ducks/usersLocation';
import { addUserLocation } from './usersLocation';

export default function* rootSaga() {
  yield all([takeLatest(UserLocationTypes.ADD_REQUEST, addUserLocation)]);
}
