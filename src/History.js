import { dispatchPopState } from './utils';

export default class History {
    static go (href, state) {
        history.pushState(state || {}, '', href);
        dispatchPopState();
    }
}
