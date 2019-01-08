let currentLocation;

let promptStatus = {
    prompts: [],
    activePrompt: null,
    confirmed: false,
    targetUrl: ''
};

/**
 * Adds slashes to start and end of path for consistency.
 *
 * @method normalizePath
 * @private
 * @param {String} path
 * @return {String}
 */
export function normalizePath (path) {
    if (path[0] !== '/') {
        path = '/' + path;
    }

    if (path[path.length - 1] === '/') {
        path = path.substring(0, path.length - 1);
    }

    return path;
}

/**
 * Trigger popstate event.
 *
 * @method dispatchPopState
 * @private
 */
export function dispatchPopState () {
    let ev = document.createEvent('Event');
    ev.initEvent('popstate', false, true);
    window.dispatchEvent(ev);
}


/**
 * Find the route that matches the location.
 *
 * @method getMatchingRoute
 * @private
 * @param {String | Object} location
 * @param {Array<VNode>} routes
 * @return {Object}
 */
export function getMatchingRoute (location, routes) {
    location = location || currentLocation;

    if (typeof location === 'string') {
        // TOOD: What about query and hash?
        location = {
            pathname: location
        }
    }

    let matched = '';
    let route = routes.find(c => {
        if (c.attributes.path) {
            let match = location.pathname.match(getPathRegex(c.attributes.path, c.attributes.exact)); 
            if (match) {
                matched = match[0]
            }
            return match;
        }

        return true;
    });

    if (route.attributes.to) {
        matched = '__redirect__';
    }

    if (route) {
        route.attributes.location = location;
    } else {
        route = null;
    }

    return { route, matched }
}

/**
 * Convert path to regex.
 *
 * @method getPathRegex
 * @private
 * @param {String} path
 * @param {Boolean} exact
 * @return {Regex}
 */
export function getPathRegex(path, exact) {
    let regex = normalizePath(path)
        .replace(/\((.*?)\)/g, '(?:$1)?')
        .replace(/:[a-zA-Z_]+/g, '([^\/]*)');

    return new RegExp('^' + regex + (exact? '$' : ''));
}

/**
 * Normalize to props for links.
 *
 * @method normalizeTo
 * @private
 * @param {String | Object} to
 * @return {Object}
 */
export function normalizeTo (to) {
    return typeof to === 'object'? to : {
        pathname: to,
        state: {}
    };
}

/**
 * Creates an object representing current location.
 * It does not store the location however.
 *
 * @method createCurrentLocationObject
 * @return {Object}
 */
export function createCurrentLocationObject () {
    return {
        pathname: normalizePath(window.location.pathname),
        search: window.location.search,
        hash: window.location.hash,
        state: history.state || {}
    }
}

/**
 * Gets current location of the page.
 *
 * @method getCurrentLocation
 * @private
 * @return {Object}
 */
export function getCurrentLocation () {
    return currentLocation;
}

/** 
 * Set shared current location object.
 *
 * @method setCurrentLocation
 * @param {Object} location
 */
export function setCurrentLocation (location) {
    currentLocation = location;
}

/**
 * Get the status of prompts.
 *
 * @method getPromprStatus
 * @private
 * @return {Object}
 */
export function getPromptStatus () {
    return promptStatus;
}

/**
 * Checks for prompts that should be active and 
 * displays them. When they confirm, they'll
 * redirect to the target url.
 *
 * @method checkForPrompt
 * @private
 * @param {String} targetUrl
 * @return {Boolean}
 */
export function checkForPrompt (targetUrl) {
    let activePrompt = promptStatus.prompts.find(p => p.props.when);
    if (activePrompt && !promptStatus.activePrompt) {
        promptStatus.activePrompt = activePrompt;
        promptStatus.targetUrl = targetUrl;
        activePrompt.forceUpdate();
    }

    return activePrompt !== undefined;
}

/**
 * Reset prompts.
 *
 * @method resetPrompt
 * @private
 */
export function resetPrompt () {
    promptStatus.activePrompt = null;
    promptStatus.confirmed = false;
}