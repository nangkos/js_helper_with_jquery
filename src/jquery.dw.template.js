if (typeof Handlebars === 'undefined') {
  throw new Error('Ui는 Handlebars.js가 필요합니다.')
}

(function (h) {
  'use strict'

  h.registerHelper('formatTime', function (value) {
    return window._dw && _dw.formatTime(value)
  })
  h.registerHelper('comma', function (value) {
    return window._dw && _dw.comma(value)
  })

  
  if (typeof window.dw === 'undefined') {
    window.dw = {}
  }

  if (typeof window.dw.template === 'undefined') {
    window.dw.template = (function () {
      return {
        render: function (tmpl) {
          var _tmpl = typeof tmpl === 'function' ? tmpl : h.compile(tmpl)

          return _tmpl
        },
        tmpl: function (prefix) {
          var _self = this
          return function (selector) {
            return _self.render(_dw.selector(prefix + selector).innerHTML)
          }
        }
      }
    })()
  }
})(Handlebars)