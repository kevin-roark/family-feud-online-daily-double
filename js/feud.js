
(function() {
  var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (!isChrome) {
      var notChromeMessage = document.createElement('div');
      notChromeMessage.className = 'not-chrome-message';
      notChromeMessage.innerHTML = 'feud.online films are only supported on Google Chrome. ' +
        'Please reload this page in Chrome, or view Carmichael\'s other work at <a href="http://www.carmichael.xyz">www.carmichael.xyz</a>.';
      document.body.appendChild(notChromeMessage);
    }
})();
