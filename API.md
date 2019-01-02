# API Documentation

## Router

Handles listening to URL changes and co-ordinates route changes.

```
    <Router>
        <div class="App">
            <Route path="/" component={MyHeader} />
            <div class="App-body">
                <Route path="/page1" component={Page1} />
                <Route path="/page2" component={Page2} />
            </div>
        </div>
    </Router>
```

## Route

Routes will render components when the page url matches the given path.

```
    <Route path="/" exact component={HomeComponent} />
    <Route path="/page" component={PageComponent} />
```

**Properties:**

* ***String* path** - url to match. If no path is given, it will always match.
* ***Boolean* exact** - url must match exactly this path.
* ***Component* component** - component to render when url matches.

**Path Examples:**

* ```/page``` - will match urls that begin with "page"
* ```/page/:id``` - will match urls that begin with page, and will store the second segment in "id" param.

**Properties passed into component:**

* ***Object* match** - contains ```params```, ```url``` and ```path```.
* ***Object* location** - the location this route is responding to.

## Redirect

When this component is rendered, it will redirect to the location provided.
Ideally should be used inside a ```Switch``` component as a fallback.

```
    <Switch>
        <Route path="/" exact component={HomeComponent} />
        <Route path="/page" component={PageComponent} />
        <Redirect to="/" />
    </Switch>
```

**Properties:**

* ***String* to** - url to redirect to.

## Switch

The first route inside a switch is the only route that will render. Subsequent routes are ignored.

```
    <Switch>
        <Route path="/" exact component={HomeComponent} />
        <Route path="/page" component={PageComponent} />
    </Switch>
```

**Properties:**

* ***String* location** - location to attempt to match routes with. If not provided it will use page url.

## Link

Renders an anchor tag but with default browser behaviour overrided to prevent page refreshes.

```
    <Link to="/page">Page</Link>
    <Link to={{ 
        pathname: '/page', 
        state: { modal: true }
    }}>Show Modal Page</Link>
```

**Properties:**

* ***String|Object* to** - url to link to. If object is passed, must have ```pathname``` and optional ```state```.
* ***Object* active** - object can have ```exact``` and ```class```. If the url matches the ```to``` property, it will add the ```class``` to the anchor tag. If ```exact``` is ```true```, the url must match exactly.

## History

**Methods:** 

**static *void* go (*String* href, *Object* state)**

Go to the href specified. State can also be optionally passed.

## Prompt

When prompts are active, will prevent url from being changed. Prompts can display confirmation messages to navigate.

```
    <Prompt when={formHalfFilled}>
        {(confirm, reject) => (
            <Modal>
                <p>Are you sure you want to leave?</p>
                <button onClick={confirm}>Leave</button>
                <button onClick={reject}>Cancel</button>
            </Modal>
        )}
    </Prompt>
```

**Properties:**

* ***Boolean* when** - If true, if the user attempts to leave, they will be blocked and confirmation will show.

## TransitionSwitch

Same as the normal switch, but also allows CSS transition animations.

```
    <TransitionSwitch animation="fade">
        <Route path="/" exact component={HomeComponent} />
        <Route path="/page" component={PageComponent} />
    </TransitionSwitch>
```

**Properties:**

* ***String* location** - location to attempt to match routes with. If not provided it will use page url.
* ***String* animation** - name of the CSS animation to use.

**Animation:**

When animating between routes, the following classes are used: 

* ```[animation]-leave``` - Initial CSS for component to be removed.
* ```[animation]-enter``` - Initial CSS for component to be rendered.
* ```[animation]-leave-active``` - Target CSS for component to be removed.
* ```[animation]-enter-active``` - Target CSS for component to be rendered.