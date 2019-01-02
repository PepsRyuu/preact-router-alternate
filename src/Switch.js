import { Component, h } from 'preact';
import { getMatchingRoute } from './utils';

export default class Switch extends Component {
    render () {
        return getMatchingRoute(this.props.location, this.props.children).route;
    }
}

