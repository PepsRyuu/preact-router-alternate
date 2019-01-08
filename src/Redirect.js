import { Component, h } from 'preact';
import History from './History';

export default class Redirect extends Component {
    componentDidMount () {
        History.go(this.props.to);
    }

    render () {
        return null;
    }
}