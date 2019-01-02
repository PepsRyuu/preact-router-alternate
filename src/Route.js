import { Component, h } from 'preact';
import { getCurrentLocation, getPathRegex } from './utils';

export default class Route extends Component {
    render ({ path }) {
        let match = {};
        let location = this.props.location || getCurrentLocation(); 

        if (path) {
            let matches = location.pathname.match(getPathRegex(path, this.props.exact));

            if (matches) {
                let params = {};
                let keyMatches = path.match(/:[a-zA-Z_]+|\*/g);

                for (let i = 1; i < matches.length; i++) {
                    params[keyMatches[i - 1].substring(1)] = matches[i];
                }

                match = {
                    url: matches[0], params, path
                }

            } else {
                return null;
            }

        }

        let Component = this.props.component || this.props.render;
        return <Component match={match} location={location} />
    }
}
