var test = require('tape')
var fake = require('.')

test('returns a function with special methods', function (t) {
  t.plan(2)
  var f = fake()
  t.equal(typeof f, 'function', 'is a function')
  t.equal(typeof f.calls, 'function', 'has special methods')
})

test('throws if parameter is not function', function (t) {
  t.plan(1)
  t.throws(fake.bind(undefined, 5), 'fek: first parameter must be function or empty')
})

test('spies optional function', function (t) {
  t.plan(1)
  var called = false
  var f = fake(function (val) {
    called = val
  })

  f(true)

  t.equal(called, true, 'called the real function')
})

test('callCount()', function (t) {
  t.plan(4)
  var f = fake()
  t.equal(typeof f.callCount, 'function', 'has callCount()')
  t.equal(typeof f.callCount(), 'number', 'returns a number')
  t.equal(f.callCount(), 0, 'is 0 before')

  f()
  f()

  t.equal(f.callCount(), 2, 'is 2 after')
})

test('calls()', function (t) {
  t.plan(5)
  var f = fake(function (x) {
    return 2 * x
  })
  t.equal(typeof f.calls, 'function', 'has calls()')
  t.equal(Array.isArray(f.calls()), true, 'returns an array')
  t.deepEqual(f.calls().length, 0, 'is empty before')

  f(2)

  t.equal(f.calls().length, 1, 'length is 1 after')
  t.deepEqual(f.calls()[0], { args: [2], returned: 4 }, 'has correct value')
})

test('lastCall()', function (t) {
  t.plan(5)
  var f = fake(function (x) {
    return 2 * x
  })
  t.equal(typeof f.lastCall, 'function', 'has lastCall()')
  t.equal(typeof f.lastCall(), 'object', 'returns an object')
  t.equal(f.lastCall(), null, 'is null before')

  f(2)

  t.deepEqual(f.lastCall(), { args: [2], returned: 4 }, 'has correct value')

  f = fake()
  f()
  t.equal(f.lastCall().returned, undefined, 'is undefined if no value was returned')
})

test('lastArgs()', function (t) {
  t.plan(4)
  var f = fake(function (x) {
    return 2 * x
  })
  t.equal(typeof f.lastArgs, 'function', 'has lastArgs()')
  t.equal(f.lastArgs(), null, 'is null before')

  f(2)

  t.equal(Array.isArray(f.lastArgs()), true, 'returns an array')
  t.deepEqual(f.lastArgs(), [2], 'has correct value')
})

test('reset()', function (t) {
  t.plan(2)
  var f = fake()
  f()
  t.equal(f.callCount(), 1, 'is 1 before')

  f.reset()

  t.equal(f.callCount(), 0, 'is 0 after')
})
