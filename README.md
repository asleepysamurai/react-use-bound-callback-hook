# react-use-bound-callback-hook
A useBoundCallback hook for React. Similar to useCallback but binds the arguments instead of relying on closures.

### What it does:

1. Memoizes a callback function based on arguments array and context passed
2. If callback function is not previously bound, binds it to passed in arguments and context
3. If callback function is previously bound, checks if passed in arguments and context differ from last bound ones.
4. If they differ, rebinds and returns rebound callback.
5. Else returns previously bound callback.

### Installation

```bash
yarn add react-use-bound-callback-hook
```

```bash
npm install react-use-bound-callback-hook
```

### Usage:

```js
import { useBoundCallback } from 'react-use-bound-callback-hook';

function onChange(setText, ev) {
    setText(ev.currentValue.text);
};

function SomeComponent(props) {
    const [text, setText] = useState('');

    return (
        <input type="text" onChange={useBoundCallback(onChange, [setText])} />
    );
}
```

`useBoundCallback` takes three arguments:
- `callback` - The callback function to be memoized
- `arguments` - The arguments to be bound to the callback function
- `context` - The context to execute the callback function as i.e. the value of `this` inside the callback. Optional. Default `null`.

