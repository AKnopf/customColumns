/*!
 * JavaScript customColumns v2.1.4
 * https://github.com/aknopf/customColumns
 *
 * Copyright 2017 Marvin Ede
 * Released under the MIT license
 */
(function($) {
  $.fn.customColumns = function(options) {

    var missinIdText = "You are trying to use customColumns cookie feature on a table without an id.";

    var missingCookiesText = "'Cookies' is not supported. Either deactivate the usage of cookies via $.fn.customColumns.settings.useCookie or make js-cookies available (https://github.com/js-cookie/js-cookie)";

    var settings = $.extend({}, $.fn.customColumns.defaults, options);

    var selectorHandle = settings.selectorHead.split(",").map(function(x) {
      return x + ' ' + settings.handleType
    }).join(", ");

    var selectorHandleHover = settings.selectorHead.split(",").map(function(x) {
      return x + ' ' + settings.handleType + ':hover'
    }).join(", ");

    function noVisibleColumns($table) {
      return $table.find(settings.selectorHead).filter(':visible').length;
    }

    function noHiddenColumns($table) {
      return $table.find(settings.selectorHead).filter(':hidden').length;
    }

    function hideColum($table, i) {
      return $table.find('td:nth-child(' + (i + 1) + '), th:nth-child(' + (i + 1) + ')').hide();
    }

    function storeAsHidden($table, i) {
      if (!$.fn.customColumns.settings.useCookie) {
        return false;
      }
      var tableId = $table.attr('id');
      if (!tableId) {
        console.warn(missingIdText);
        return false;
      }
      if (!Cookies) {
        console.warn(missingCookiesText);
        return false;
      }
      var cookie = Cookies.getJSON($.fn.customColumns.settings.cookieNamespace) || {};
      var hiddenColumns = cookie[tableId] || [];
      hiddenColumns.push(i);
      cookie[tableId] = hiddenColumns;
      return Cookies.set($.fn.customColumns.settings.cookieNamespace, cookie);
    }

    function restore($table) {
      var result = $table.find('td, th').show();
      if ($.fn.customColumns.settings.useCookie) {
        var tableId = $table.attr('id');
        if (!tableId) {
          console.warn(missingIdText);
          return false;
        }
        if (!Cookies) {
          console.warn(missingCookiesText);
          return false;
        }
        var cookie = Cookies.getJSON($.fn.customColumns.settings.cookieNamespace) || {};
        delete cookie[tableId];
        Cookies.set($.fn.customColumns.settings.cookieNamespace, cookie);
      }
      return result;
    }

    function beautifyHandles($table) {
      $table.find(selectorHandle)
        .css(settings.handleCss)
        .hover(
          function() {
            $(this).css(settings.handleHoverCss)
          },
          function() {
            $(this).css(settings.handleCss)
          }
        );
    }

    return $.each(this, function() {
      var $table = $(this);

      $table.find(settings.selectorHead).css({
        'position': 'relative'
      });

      $table.find(settings.selectorHead).append(settings.handle);

      $table.on("click", selectorHandle, function() {
        var noColumns = noVisibleColumns($table);
        if (noColumns > 1) {
          var i = $(this).parent().index();
          var $elem = $table.find('td:nth-child(' + (i + 1) + '), th:nth-child(' + (i + 1) + ')');
          settings.beforeHide($elem, function() {
            $elem.hide();
            if (noColumns == 2) {
              $table.find(selectorHandle).replaceWith(settings.restoreHandle);
              beautifyHandles($table);
            }
          });
          storeAsHidden($table, i);
          settings.afterHide($elem);
        } else {
          restore($table);
          $table.find(selectorHandle).replaceWith(settings.handle);
          beautifyHandles($table);
        }
      });

      if ($.fn.customColumns.settings.useCookie) {
        var tableId = $table.attr('id');
        if (tableId) {
          if (Cookies) {
            var cookie = Cookies.getJSON($.fn.customColumns.settings.cookieNamespace) || {};
            var hiddenColumns = cookie[tableId] || [];
            var hiddenColumnsLength = hiddenColumns.length;
            for (var i = 0; i < hiddenColumnsLength; i++) {
              var j = hiddenColumns[i];
              hideColum($table, j);
            }
            if (noVisibleColumns($table) == 1) {
              $table.find(selectorHandle).replaceWith(settings.restoreHandle)
            }
          } else {
            console.warn(missingCookiesText);
          }
        }
      }
      return beautifyHandles($table);
    });
  }
  $.fn.customColumns.settings = {
    'cookieNamespace': 'jquery.customColumns',
    'useCookie': true
  };
  $.fn.customColumns.defaults = {
    selectorHead: 'thead td, th',
    handle: '<span>x</span>',
    restoreHandle: '<span>restore columns</span>',
    handleType: 'span',
    handleCss: {
      'position': 'absolute',
      'right': '0.5em',
      'cursor': 'pointer',
      'transition': 'all 500ms ease-in-out',
      'opacity': '0.5'
    },
    handleHoverCss: {
      'opacity': '1'
    },
    beforeHide: function($elem, callback) {
      return callback();
    },
    afterHide: function($elem) {
      return true;
    }
  };
}(jQuery));
