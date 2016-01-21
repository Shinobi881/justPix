var SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
var NON_ALPHANUMERIC_REGEXP = /([^\#-~| |!])/g;

function encodeEntities(value) {
  return value.
    replace(/&/g, '&amp;').
    replace(SURROGATE_PAIR_REGEXP, function(value) {
      var hi = value.charCodeAt(0);
      var low = value.charCodeAt(1);
      return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
    }).
    replace(NON_ALPHANUMERIC_REGEXP, function(value) {
      return '&#' + value.charCodeAt(0) + ';';
    }).
    replace(/</g, '&lt;').
    replace(/>/g, '&gt;');
}

module.exports = {
  sanitize: encodeEntities
};

// Test Scripts

/*
>"'><script>alert(‘XSS')</script>
>%22%27><img%20src%3d%22javascript:alert(%27XSS%27)%22>
>"'><img%20src%3D%26%23x6a;%26%23x61;%26%23x76;%26%23x61;%26%23x73;%26%23x63;%26%23x72;%26%23x69;%26%23x70;%26%23x74;%26%23x3a;alert(%26quot;XSS%26quot;)>
AK%22%20style%3D%22background:url(javascript:alert(%27XSS%27))%22%20OS%22
%22%2Balert(%27XSS%27)%2B%22
<table background="javascript:alert(([code])"></table>
<object type=text/html data="javascript:alert(([code]);"></object>
<body onload="javascript:alert(([code])"></body>
*/