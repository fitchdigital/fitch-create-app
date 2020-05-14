import { APP_READY } from './actions';

const initialState = {
    ready: false,
};

export const application = (state = initialState, action) => {
    switch (action.type) {
        case APP_READY:
            return state.withMutations(ctx => {
                ctx.set('ready', true);
            });
        default:
            return state;
    }
};
