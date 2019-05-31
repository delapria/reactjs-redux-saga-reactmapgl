import { call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../services/api';

import { Creators as FrientLocationAction } from '../ducks/usersLocation';
import { Creators as ModalActions } from '../ducks/modal';

export function* addUserLocation(action) {
  try {
    const { data } = yield call(api.get, `/users/${action.payload.user}`);

    const isDuplicated = yield select(state => state.usersLocation.data.find(userLocation => userLocation.id === data.id));
    
    if (isDuplicated) {
      yield put(FrientLocationAction.addUserLocationFailure('Usuário já cadastrado'));
      toast.warn('Usuário já cadastrado!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const userData = {
        id: data.id,
        login: data.login,
        name: data.name,
        avatar: data.avatar_url,
        cordinates: action.payload.cordinates,
      };

      yield put(FrientLocationAction.addUserLocationSuccess(userData));
      toast.success('Usuário adicionado com sucesso', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (err) {
    yield put(FrientLocationAction.addUserLocationFailure('Erro ao adicionar usuário'));
    toast.error('Erro ao adicionar usuário!', {
      position: toast.POSITION.TOP_RIGHT,
    });
  } finally {
    yield put(ModalActions.hideModal());
  }
}
