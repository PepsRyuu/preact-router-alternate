import { Component } from 'preact';
import './PromptPage.scss';
import Modal from '../../components/modal/Modal';
import { Prompt } from 'preact-router-alternate';

export default class PromptPage extends Component {
    onInput (e) {
        this.setState({
            isBlocking: e.currentTarget.value.length > 0,
            value: e.currentTarget.value
        });
    }

    render () {
        return (
            <div class="PromptPage">
                <h1>Prompt</h1>
                <p>
                    Prompt component allows you to display a confirm navigation message when the user is about to navigate.
                </p>
                <p>
                    Type in some text into the input field.
                    If you try to navigate while there is text, it will show the confirmation modal.
                </p>
                <input type="text" value={this.state.value} onInput={this.onInput.bind(this)}/>
                <Prompt when={this.state.isBlocking}>
                    {(confirm, reject) => (
                        <Modal>
                            <p>Are you sure you want to leave?</p>
                            <div>
                                <button onClick={confirm}>Leave</button>
                                <button onClick={reject}>Cancel</button>
                            </div>
                        </Modal>
                    )}
                </Prompt>
            </div>
        )
    }
}