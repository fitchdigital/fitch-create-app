import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { application } from 'app/store/application/reducers';
import history from 'app/history';

export default combineReducers({
    routing: connectRouter(history),
    application,
});
