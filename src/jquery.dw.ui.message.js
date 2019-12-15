if (typeof jQuery === 'undefined') {
  throw new Error('Ui는 jQuery.js가 필요합니다.')
}


(function ($) {
  'use strict'

  
  if (typeof window.dw === 'undefined') {
    window.dw = {}
  }

  if (typeof dw.ui === 'undefined') {
    dw.ui = (function () {
      return {
        btns: {
          cancel: { type: 'cancel', label: '취소', value: false },
          ok: { type: 'ok', label: '확인', value: true }
        }
      }
    })()
  }

  dw.ui.message = function (btns, tmpl) {
    var _tmpl = '' +
    '<div class="alert{{#if classes}} {{ classes }}{{/if}}" role="alert">' +
    '<div class="body">' +
      '<div class="msg">{{{msg}}}</div>' +
      '<div class="buttons text-right">' +
      '{{#btns}}' +
        '<button type="button" class="btn {{type}}" data-value="{{value}}">{{label}}</button>' +
      '{{/btns}}' +
      '</div>' +
    '</div></div>'
    var _template = dw.template.render(tmpl || _tmpl)
    return function (msg, classes) {
      var _dfd = $.Deferred()
      var _message = $(_template({
        msg: msg,
        classes: classes,
        btns: btns
      }))
      _message
      .appendTo('body')
      .on('click', 'button.btn[data-value]', function (e) {
        _message.remove()
        _dfd.resolve($(this).data('value'))
      })
      return _dfd.promise()
    }
  }

  dw.ui.confirm = (function (message) {
    var _btns = [dw.ui.btns.cancel, dw.ui.btns.ok]
    return message(_btns)
  })(dw.ui.message)

  
  dw.ui.alert = (function (message) {
    var _btns = [dw.ui.btns.ok]
    return message(_btns)
  })(dw.ui.message)
})(jQuery)