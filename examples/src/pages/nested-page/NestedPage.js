import { Component } from 'preact';
import { Link, TransitionSwitch, Route } from 'preact-router-alternate';
import './NestedPage.scss';

function Tab1Component () {
    return (
        <div class="TabContent">Tab 1 Content</div>
    );
}

function Tab2Component () {
    return (
        <div class="TabContent">Tab 2 Content</div>
    );
}


let TabData = [{
    url: 'tab1',
    title: 'Tab 1',
    content: Tab1Component
}, {
    url: 'tab2',
    title: 'Tab 2',
    content: Tab2Component
}];

export default class NestedPage extends Component {
    
    render () {
        return (
            <div class="NestedPage">
                <h1>Nested</h1>
                <p>
                    Routes can be nested inside routes. 
                </p>
                <p>
                    This app already uses a TransitionSwitch to manage switching
                    between each of the demos. This page includes another TransitionSwitch
                    which is used to switch between the tabs below.
                </p>
                <div class="tabs">
                    <div class="tabs-header">
                        {TabData.map(obj => (
                            <div>
                                <Link   
                                    to={`/nested/${obj.url}`}
                                    active={{ class: 'tabs-active' }}
                                >{obj.title}</Link>
                            </div>
                        ))}
                    </div>
                    <div class="tabs-body">
                        <TransitionSwitch animation="fade" location={this.props.location.pathname.replace(this.props.match.url, '')}>
                            {TabData.map(obj => (
                                <Route path={obj.url} component={obj.content} />
                            ))}
                        </TransitionSwitch>
                    </div>
                </div>
            </div>
        )
    }
}