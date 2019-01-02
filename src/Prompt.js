import { Component, h } from 'preact';
import { getPromptStatus } from './utils';
import History from './History';

function confirmNavigation () {
    let status = getPromptStatus();
    status.confirmed = true;
    History.go(status.targetUrl);
}

function cancelNavigation () {
    let status = getPromptStatus();
    status.activePrompt = null;
    status.prompts.find(p => p.props.when).forceUpdate();
}

export default class Prompt extends Component {
    constructor () {
        super();
        this.__onBeforeUnload = this.__onBeforeUnload.bind(this);
    }

    componentDidMount () {
        getPromptStatus().prompts.push(this);
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.when) {
            window.addEventListener('beforeunload', this.__onBeforeUnload);
        } else {
            window.removeEventListener('beforeunload', this.__onBeforeUnload);
        }
    }

    componentWillUnmount () {
        let { prompts } = getPromptStatus();
        window.removeEventListener('beforeunload', this.__onBeforeUnload);
        prompts.splice(prompts.indexOf(this), 1);
    }

    __onBeforeUnload (e) {
        e.preventDefault();
        e.returnValue = this.props.when;
        return this.props.when;
    }

    render () {
        if (getPromptStatus().activePrompt === this) {
            return this.props.children[0](confirmNavigation, cancelNavigation)
        }

        return null;
    }
}