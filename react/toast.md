## How to create toast in react

### Usage pattern

see [How to create modal in react](./modal.md)

### Main steps

##### Create a singleton service to provided manager API

Implementing a inert case

```typescript
class Producer {
  private static instance: Manager; // the component which use to manage toast lifecycle
  private static async getInstance() {
    if (!Producer.instance) {
      Producer.instance = await Producer.init(); // Inert case
    }
    return Producer.instance;
  }
}
```

Create a portal at init lifecycle

```typescript
class Producer {
  // ...
  private static init() {
    return new Promise<Manager>(resolve => {
      // resolve Manager instance when Manager was instanced
      const saveRef = (ref: Manager) => resolve(ref);
      ReactDOM.render(
        React.createElement(Manager, { ref: saveRef }),
        Producer.createPortal() // same as modal
      );
    });
  }
  // ...
}
```

Provide API to access Manager instance to manipulate toast

```typescript
class Producer {
  // ...
  public static info(...args) {
    Producer.getInstance().then(ins => {
      ins.add(args); // contain content and duration and so on
    });
  }
  // ...
}
```

##### Create Manager component wield absolute power in front of toast

UUID mechanism

```typescript
let seed = 0;
const now = Date.now();
const getUUID = () => `${now}_${seed++}`;
```

simple list render

```tsx
class Manager extends React.PureComponent<any, State> {
  public readonly state: State = { oven: [] };
  public render() {
    const { oven } = this.state;
    return oven.map(dough => (
      <Toast
        key={dough.key}
        duration={dough.duration}
        onClose={this.remove.bind(this, dough.key)}
      >
        {dough.content}
      </Toast>
    ));
  }
  public add(...args) {
    this.setState(prevState => ({
      oven: [
        ...prevState.oven,
        { key: getUUID() /* content & duration here */ }
      ]
    }));
  }
  public remove(key) {
    this.setState(prevState => ({
      oven: prevState.oven.filter(dough => dough.key !== key)
    }));
  }
}
```

##### Toast component

Lifecycle

```typescript
class Toast extends React.PureComponent<Props, State> {
  public componentDidMount() {
    this.startTimer(); // close self after timeout
  }
  public componentWillUnmount() {
    this.clearTimer(); // avoid memory leaks
  }
}
```

Render logic

```tsx
class Toast extends React.PureComponent<Props, State> {
  // ...
  public render() {
    const { children } = this.props;
    const { isShow } = this.state;
    return (
      // same as modal animate
      <Transition appear in={isShow} timeout={duration.standard}>
        {state => (
          <ToastWrap
            className={state}
            onMouseEnter={this.clearTimer} // hold on when hover
            onMouseLeave={this.startTimer}
            style={{ ...ToastState[state] }}
          >
            {children}
          </ToastWrap>
        )}
      </Transition>
    );
  }
  // ...
}
```

### Reference

[Singleton pattern](https://en.wikipedia.org/wiki/Singleton_pattern)
