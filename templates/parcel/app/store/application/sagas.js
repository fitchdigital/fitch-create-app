import { put, takeLatest } from 'redux-saga/effects';
import { APP_INIT, APP_READY } from './actions';

function * sagaAppInit (action) {
    // call any external api here before making app available

    // app is ready, display it
    yield put({ type: APP_READY });
}

export function * watchAppRequests () {
    yield takeLatest(APP_INIT, sagaAppInit);
}
