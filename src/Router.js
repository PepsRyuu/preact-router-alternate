import { Component, h } from 'preact';
import { 
    getCurrentLocation, 
    setCurrentLocation,
    createCurrentLocationObject,
    getPromptStatus,
    checkForPrompt,
    resetPrompt
} from './utils';

setCurrentLocation(createCurrentLocationObject());

let historyIndex = history.state && history.state.__index? history.state.__index : 0;
let prevHistoryIndex;
let isRevertingNavigation = false;

function applyHistoryIndex () {
    let state = history.state || {};
    if (state.__index === undefined) {
        state.__index = historyIndex++;
        history.replaceState(state, '');
    }
    return state;
}

export default class Router extends Component {
    constructor () {
        super();
        this.onPopState = this.onPopState.bind(this);
        applyHistoryIndex();
    }

    componentWillMount () {
        window.addEventListener('popstate', this.onPopState);
    }

    componentWillUnmount () {
        window.removeEventListener('popstate', this.onPopState);
    }

    onPopState (e) {
        let nextLocation = createCurrentLocationObject();
        let historyState = applyHistoryIndex();

        if (checkForPrompt(nextLocation.pathname)) {
            let promptStatus = getPromptStatus();

            if (!promptStatus.confirmed) {
                if (!isRevertingNavigation) {
                    isRevertingNavigation = true;

                    if (prevHistoryIndex === undefined || historyState.__index > prevHistoryIndex) {
                        return history.back();
                    } else {
                        return history.forward();
                    }
                } else {
                    return isRevertingNavigation = false;
                }
            }

            if (promptStatus.confirmed) {
                resetPrompt();
            }

        }

        prevHistoryIndex = historyState.__index;
     
        if (getCurrentLocation().pathname !== nextLocation.pathname) {
            setCurrentLocation(nextLocation);
        }
        
        this.forceUpdate();
    }

    render () {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}