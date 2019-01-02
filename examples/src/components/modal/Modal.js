import { Component } from 'preact';
import './Modal.scss';

export default class Modal extends Component {
    render () {
        return (
            <div class="Modal">
                <div class="Modal-background" />
                <div class="Modal-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}