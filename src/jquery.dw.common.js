(function () {
  'use strict'

  if (typeof window.dw === 'undefined') {
    window.dw = {}
  }

  if (typeof dw._ === 'undefined') {
    dw._ = (function () {
      var _version = '1.0'
      var _value = function (value) {
        return value.toString()
      }
      var _trim = function (value) {
        return _value(value).replace(/^\s+|\s+$/g, '')
      }
      return {
        isBlank: function (value) {
          return /^[\s\uFEFF\xA0]*$/.test(this.trim(value))
        },
        trim: _trim,
        left: function (value, len) {
          return _value(value).substring(0, len)
        },
        right: function (value, len) {
          var __value = this.trim(value),
            __from = __value.length - len
          return __value.substr(__from < 0 ? 0 : __from)
        },
        comma: function (value) {
          var _self = this;
          return this.trim(value)
            .replace(/,/, '')
            .replace(/^([-+]?\d+)(\d{3})($|\..*$)/g, function (origin, p1, p2, p3) {
              return _self.comma(p1) + ',' + (p2 + p3)
            })
        },
        append: function (cur, add, delimeter) {
          if (this.trim(cur) === '' || this.trim(add) === '') delimeter = ''
          return cur.concat(delimeter, add)
        },
        pad: function (value, digits) {
          var __value = _value(value)
          return Array(Math.max(digits - __value.length + 1, 0)).join(0) + __value
        },
        bytes: function (value) {
          var __bytes = 0,
            __value = _value(value)
          
          for (var idx = 0; idx < __value.length; ++idx) {
            __bytes += __value.charCodeAt(idx) <= 0x00007F ? 1 : 2
          }

          return __bytes
        },
        getURL: function (default_url) {
          return function (url) {
            return (default_url || '') + url
          }
        },
        selector: function (id) {
          return document.querySelector(id)
        },
        formatDate: function (value, formatter) {

          return value
        },
        formatTime: function (value, formatted) {
          //formatted boolean
          var  _times = [],
            _format = ['시', '분', '초'];
          [60, 60, 24].reduce(function (acc, cur) {
            _times.push(acc % cur)
            return Math.floor(acc / cur)
          }, value)
      
          return _times
            .reverse()
            .reduce(function (acc, cur, idx) {
              if (formatted) {
                if (acc.length > 0 || cur > 0) acc.push(cur + _format[idx])
              } else {
                acc.push((cur < 10 ? '0' : '') + cur)
              }
              return acc
            }, [])
            .join(formatted ? ' ' : ':')
        }
      }
    })()
  }

  if (typeof window._dw === 'undefined') {
    window._dw = dw._
  }
})()