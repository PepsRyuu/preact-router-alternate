import { Component } from 'preact';
import './TransitionsPage.scss';
import { TransitionSwitch, Route } from 'preact-router-alternate';

const animations = ['slide-up', 'slide-left', 'flip'];

export default class TransitionsPage extends Component {
    constructor () {
        super();

        this.state = {
            active: '/0'
        };

        this.onRandom = this.onRandom.bind(this);
    }

    onRandom () {
        while (true) {
            let candidate = '/' + Math.floor(Math.random() * 5);
            if (this.state.active !== candidate) {
                this.setState({ active: candidate });
                break;
            }
        }
    }

    render () {
        let animation = animations[Math.floor(Math.random() * animations.length)];

        return (
            <div class="TransitionsPage">
                <h1>Transitions</h1>
                <p>
                    Different types of transitions are supported.
                    Below is a demonstration of random transitions one can implement
                    when using this library.
                </p>
                <button onClick={this.onRandom}>Random</button>
                <div class="container">
                    <TransitionSwitch location={this.state.active} animation={animation}>
                        {[0, 1, 2, 3, 4].map(num => {
                            return (
                            <Route path={'/' + num} component={()=> <div data-index={num} class="entry">{num}</div> }/>
                        )})}
                    </TransitionSwitch>
                </div>
            </div>
        )
    }
}