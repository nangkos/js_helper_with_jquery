if (typeof jQuery === 'undefined') {
  throw new Error('Remote는 jQuery.js가 필요합니다.')
}

(function ($) {
  'use strict'

  
  if (typeof window.dw === 'undefined') {
    window.dw = {}
  }

  if (typeof dw.remote === 'undefined') {
    dw.remote = function (default_url) {
      var _url = _dw.getURL(default_url)
      $.ajaxSetup({ cache: false })

      return {
        _ajax: function (method, url, data) {
          return $.ajax({
            method: method,
            url: _url(url),
            data: data
          })
        },
        get: function (url, data) {
          return this._ajax('GET', url, data)
        },
        post: function (url, data) {
          return this._ajax('POST', url, data)
        },
        'delete': function (url, data) {
          return this._ajax('DELETE', url, data)
        },
        put: function (url, data) {
          return this._ajax('PUT', url, data)
        }
      }
    }
  }
})(jQuery)