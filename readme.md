# fek
One ridiculously simple function to fake and spy.

## Installation
```
npm i fek
```

## Usage

```javascript
var test = require('tape')
var fake = require('fek')

test('spy', function (t) {
  t.plan(4)
  // spy
  var f = fake(function (x) {
    return x * 2
  })

  f(2)

  t.equal(f.callCount(), 1, 'it was called once')
  t.deepEqual(f.lastArgs(), [2], 'with 2 as argument')
  t.equal(f.lastCall().returned, 4, 'returned 4')

  // or fake
  var f = fake()

  f()

  t.equal(f.callCount(), 1, 'it was called once')
})
```

## API
#### `spy = fake(fn)`
Wraps `fn` in a spy. If there's no `fn` it fakes a function.

#### `spy.calls()`
Returns an array of calls with the following properties:
- `args`: an array of arguments
- `returned`: the value that was returned by `fn`

#### `spy.callCount()`
Returns the number of times the function was called.

#### `spy.lastCall()`
Returns the call object of the last call.

#### `spy.lastArgs()`
Returns the arguments of the last call.

#### `spy.reset()`
Resets all spy values.

## See Also
- [jupiter/simple-mock](https://github.com/jupiter/simple-mock)
