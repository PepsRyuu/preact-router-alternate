import { Component } from 'preact';
import { Link, Router, TransitionSwitch, Route, Redirect } from 'preact-router-alternate';
import HomePage from './pages/home-page/HomePage';
import PromptPage from './pages/prompt-page/PromptPage';
import NestedPage from './pages/nested-page/NestedPage';
import ModalPage from './pages/modal-page/ModalPage';
import TransitionsPage from './pages/transitions-page/TransitionsPage';
import './App.scss';

export default class App extends Component {
    render () {
        return (
            <Router>
                <div class="App">
                    <div class="App-sidebar">
                        <ul>
                            <li><Link to="/" active={{ exact: true, class: 'App-activeLink' }}>Home</Link></li>
                            <li><Link to="/prompt" active={{ class: 'App-activeLink' }}>Prompt</Link></li>
                            <li><Link to="/nested" active={{ class: 'App-activeLink' }}>Nested</Link></li>
                            <li><Link to="/modal" active={{ class: 'App-activeLink' }}>Modal</Link></li>
                            <li><Link to="/transitions" active={{ class: 'App-activeLink' }}>Transitions</Link></li>
                        </ul>
                    </div>
                    <div class="App-page">
                        <TransitionSwitch animation="fade">
                            <Route path="/" exact component={HomePage} />
                            <Route path="/prompt" component={PromptPage} />
                            <Route path="/nested" component={NestedPage} />
                            <Route path="/modal" component={ModalPage} />
                            <Route path="/transitions" component={TransitionsPage} />
                            <Redirect to="/" />
                        </TransitionSwitch>
                    </div>
                </div>
            </Router>
        );
    }
}