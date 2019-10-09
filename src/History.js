import { dispatchPopState } from './utils';

export default class History {
    static go (href, state) {
        // For some reason, for prompt, '' doesn't work. Must be '/'
        history.pushState(state || {}, '', href || '/');
        dispatchPopState();
    }
}
