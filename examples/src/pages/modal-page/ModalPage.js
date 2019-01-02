import { Component } from 'preact';
import { Switch, Route, Link } from 'preact-router-alternate';
import Modal from '../../components/modal/Modal';
import './ModalPage.scss';

const IMAGES = [
    { id: 0, title: "Dark Orchid", color: "DarkOrchid" },
    { id: 1, title: "Lime Green", color: "LimeGreen" },
    { id: 2, title: "Tomato", color: "Tomato" },
    { id: 3, title: "Seven Ate Nine", color: "#789" },
    { id: 4, title: "Crimson", color: "Crimson" }
];

class ModalSwitch extends Component {
    constructor (props) {
        super();

        this.previousLocation = props.location;
    }

    componentWillUpdate(nextProps) {
        let { location } = this.props;

        // set previousLocation if props.location is not modal
        if (
            (!location.state || !location.state.modal)
        ) {
            this.previousLocation = this.props.location;
        }
    }

    render() {
        let { location } = this.props;

        let isModal = !!(
            location.state &&
            location.state.modal &&
            this.previousLocation !== location
        ); // not initial render

        return (
            <div>
                <Switch location={isModal ? this.previousLocation : location}>
                    <Route exact path="/modal" component={HomeView} />
                    <Route path="/modal/gallery" component={GalleryView} />
                    <Route path="/modal/img/:id" component={ImageView} />
                </Switch>
                {isModal ? <Route path="/modal/img/:id" component={ModalView} /> : null}
            </div>
        );
    }
}


function Thumbnail ({ color }) {
    return (
        <div
            style={{
                width: 50,
                height: 50,
                background: color
            }}
        />
    );
}


function Image ({ color }) {
    return (
        <div
            style={{
                width: "100%",
                height: 400,
                background: color
            }}
        />
    );
}

function HomeView () {
    return (
        <div>
            <Link to="/modal/gallery">Visit the Gallery</Link>
            <h2>Featured Images</h2>
            <ul>
                <li>
                    <Link to="/modal/img/2">Tomato</Link>
                </li>
                <li>
                    <Link to="/modal/img/4">Crimson</Link>
                </li>
            </ul>
        </div>
    );
}



function GalleryView () {
    return (
        <div>
            {IMAGES.map(i => (
                <Link  
                    key={i.id}
                    to={{
                        pathname: `/modal/img/${i.id}`,
                        // this is the trick!
                        state: { modal: true }
                    }}
                >
                    <Thumbnail color={i.color} />
                    <p>{i.title}</p>
                </Link>
            ))}
        </div>
    );
}

function ImageView ({ match }) {
    let image = IMAGES[parseInt(match.params.id, 10)];

    if (!image) return <div>Image not found</div>;

    return (
        <div>
            <h1>{image.title}</h1>
            <Image color={image.color} />
        </div>
    );
}

function ModalView ({ match }) {
    let image = IMAGES[parseInt(match.params.id, 10)];

    if (!image) return null;

    let back = e => {
        e.stopPropagation();
        history.back();
    };

    return (
        <Modal>
            <h1>{image.title}</h1>
            <Image color={image.color} />
            <button type="button" onClick={back}>Close</button>
        </Modal>
    );
}

export default class ModalPage extends Component {
    
    render () {
        console.log('modalpage render');

        return (
            <div class="ModalPage">
                <h1>Modal</h1>
                <p>
                    Shows how to display a modal instead of doing a page change.
                </p>
                <p>
                    Based on the example found at <a href="https://reacttraining.com/react-router/web/example/modal-gallery">React Router</a> documentation.
                </p>
                 <Route component={ModalSwitch} />
            </div>
        )
    }
}









