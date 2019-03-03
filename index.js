module.exports = function (real) {
  if (real && typeof real !== 'function') {
    throw new Error('fek: first parameter must be function or empty')
  }
  var _calls = []

  var f = function (...args) {
    var returned

    if (real) {
      returned = real(...args)
    }

    _calls.push({
      args: args,
      returned: returned
    })
  }

  // methods
  f.calls = () => _calls
  f.callCount = () => _calls.length
  f.lastCall = () => _calls[_calls.length - 1] ? _calls[_calls.length - 1] : null
  f.lastArgs = () => _calls[_calls.length - 1] ? _calls[_calls.length - 1].args : null
  f.reset = () => {
    _calls = []
  }

  return f
}
