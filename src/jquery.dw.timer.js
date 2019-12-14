(function () {
  'use strict'

  if (typeof window.dw === 'undefined') {
    window.dw = {}
  }

  if (typeof dw.timer === 'undefined') {
    dw.timer = function (callback, interval) {
      var _timerId = null
      var _interval = interval || 0
      var _callback = (typeof callback === 'function' && callback) || function () {}
      var _startTime = 0

      if (typeof callback === 'number') _interval = callback

      return {
        start: function (callback, interval) {
         _startTime = new Date().getTime();
  
          (callback || _callback)()
          _timerId = setInterval(callback || _callback, interval || _interval)
        },
        stop: function (callback, interval) {
          var _interval = interval || 0
          var _callback = (typeof callback === 'function' && callback) || function () {}
          if (typeof callback === 'number') _interval = callback
  
          setTimeout(function () {
            clearInterval(_timerId)
            _timerId = null;
            _callback()
  
          }, _interval)
        },
        getInterval: function () {
          var _endTime = new Date().getTime(),
            _return = Math.floor((_endTime - _startTime) / 1000)
          _startTime = _endTime
  
          return _return
        }
      }
    }
  }

})()