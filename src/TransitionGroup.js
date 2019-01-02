import { Component, h } from 'preact';

/**
 * This solves a problem of subroutes reacting
 * to route changes when they are being animated out. 
 *
 * @class TransitionElement
 * @private
 */

class TransitionElement extends Component {
    shouldComponentUpdate (nextProps) {
        return !nextProps.preventUpdating;
    }

    render () {
        return this.props.children[0];
    }
}

/**
 * Handles animating of mounts and unmounting components.
 *
 * @class TransitionGroup
 * @private
 */
 export default class TransitionGroup extends Component {
    constructor (props) {
        super();

        this.active = props;
        this.onActiveTransitionEnd = this.onActiveTransitionEnd.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.tkey !== this.active.tkey) {
            this.active = nextProps;
            this.prev = this.props;
            this.prepareAnimation = true;
            this.performAnimation = false;
        }
    }

    componentDidUpdate () {
        // TODO: Transition Mode
        if (this.prepareAnimation && !this.performAnimation) {
            this.performAnimation = true;

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.forceUpdate();
                });
            });
        }
    }

    onActiveTransitionEnd () {
        this.prev = undefined;
        this.prepareAnimation = false;
        this.performAnimation = false;
        this.forceUpdate();
    }

    render () {
        let { animation } = this.props;
        let classCalc = (type) => this.prepareAnimation? `${animation}-${type} ` + (this.performAnimation? `${animation}-${type}-active` : '') : '';

        return (
            <div style="height: 100%;">
                {this.prev && (
                    <div 
                        style="height: 100%;"
                        key={this.prev.tkey} 
                        class={classCalc('leave')}
                    >
                        <TransitionElement preventUpdating={true}>
                            {this.prev.children}
                        </TransitionElement>
                    </div>
                   
                )}
                {this.active && (
                    <div 
                        style="height: 100%"
                        key={this.active.tkey}
                        class={classCalc('enter')}
                        onTransitionEnd={this.performAnimation && this.onActiveTransitionEnd}
                    >
                        <TransitionElement preventUpdating={this.animating}>
                            {this.active.children}
                        </TransitionElement>
                    </div>
                    
                )}
            </div>
        );
    }
}