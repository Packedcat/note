## How to create modal in react

### Usage pattern

##### Instructive

```javascript
// instantiation first
const modalInstance = new Modal(options);
// use like below
modalInstance.show();
modalInstance.hide();
```

##### Declarative

```react
// in render function
<Modal visiable={state.show} />
// use like below
setState({ show: true|false })
```

### Main steps

##### Create container

```javascript
const container = document.createElement("div");
document.body.appendChild(container);
```

##### Create portal(just like manager or entry)

```javascript
// in portal render function
// ...
if (visible || this.modalRef) {
  return ReactDOM.createPortal(
    React.createElement(Modal, { ref: this.modalRef }),
    fakeContainer // this will the contain was created above
  );
}
return null; // return null before first show
```

##### Save performance(update when need)

```javascript
shouldComponentUpdate({ visible }) {
  return !!(this.props.visible || visible)
}
```

##### Destruct(remove container)

```javascript
componentWillUnmount() {
  if (this.container) {
    this.container.parentNode!.removeChild(this.container)
    this.container = null
  }
}
```

### Caveats

##### Scroll content or scroll modal?

- scroll content can use flex layout to adjust modal to the vertical center
- scroll modal can show more main content

##### SSR

```javascript
// always return null if without browser environment
if (typeof window === "undefined") {
  return null;
}
```

##### Transition `display: none;` element

> Mixing `display:none;` with other transitions
>
> Problem: You want an element to be hidden but also don't take up any space. You set `display:none;` Now, when you wanna show it and set it to `display:block;`, it instantly appears. Great, now let's add another transition, like fadein or slide down.. oohh.. snap! Doesn't work.
>
> You could add a class with a delayed JS call, or...
>
> If your enviroment allows to rely on keyframe animations: Put all the other transitions into a keyframe animation and it works! \o/

### Reference

[Portals](https://reactjs.org/docs/portals.html)

[Mixing display:none with other transitions](https://jsfiddle.net/jalbertbowdenii/mHRb8/)

[A Modest Proposal for CSS3 Animations](http://snook.ca/archives/html_and_css/css3-animation-proposal#c68482)
