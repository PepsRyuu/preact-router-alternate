import { Component, h } from 'preact';
import History from './History';

export default class Redirect extends Component {
    render () {
        History.go(this.props.to);
        return null;
    }
}