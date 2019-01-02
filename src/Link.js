import { Component, h } from 'preact';
import { normalizeTo, getPathRegex, getCurrentLocation } from './utils';
import History from './History';

export default class Link extends Component {
    constructor () {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick (e) {
        let { pathname, state } = normalizeTo(this.props.to);
        e.preventDefault();
        History.go(pathname, state);
    }

    render ({ active, to }) {
        let classes = '';
        let { pathname } = normalizeTo(to);
        
        if (active) {
            let matches = getCurrentLocation().pathname.match(getPathRegex(pathname, active.exact));
            classes = matches && matches.length > 0? active.class : '';
        }

        return (
            <a class={classes} href={pathname} onClick={this.onClick}>
                {this.props.children}
            </a>
        );
    }

}
