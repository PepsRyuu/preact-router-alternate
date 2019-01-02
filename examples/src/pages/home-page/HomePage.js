import { Component } from 'preact';
import './HomePage.scss';

export default class HomePage extends Component {
    
    render () {
        return (
            <div class="HomePage">
                <h1>Preact Transition Router</h1>
                <p>
                    This app contains examples on how to use Preact Transition Router.
                </p>
                <p>
                    Navigate to a demo by clicking a link on the sidebar.
                </p>
            </div>
        )
    }
}