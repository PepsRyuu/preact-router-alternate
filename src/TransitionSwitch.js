import { Component, h } from 'preact';
import TransitionGroup from './TransitionGroup';
import { getMatchingRoute } from './utils';

export default class TransitionSwitch extends Component{
    render () {
        let { route, matched } = getMatchingRoute(this.props.location, this.props.children);

        return (
            <TransitionGroup tkey={matched} animation={this.props.animation}>
                {route}
            </TransitionGroup>
        );
    }
}

