import { fork, all } from 'redux-saga/effects';
import { watchAppRequests } from 'app/store/application/sagas';

export default function * () {
    yield all([fork(watchAppRequests)]);
}
