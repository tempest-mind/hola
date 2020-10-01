(function($) {
  let state;
  const hash = document.location.hash;
  const $currentUrl  = $('#current-url');
  const $clientIdForm = $('#client-id-form');
  const $clientId = $('#client-id');
  const $authUrl = $('#auth-url');

  function submit($evt) {
    console.log('submit');
    $evt.preventDefault();
    let clientId = $clientId.val();
    if (clientId) {
      var redirectURI = document.location.href;
      $authUrl.prop('href', `https://app.netlify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectURI}&state=${state}`);
      $('.step').hide();
      $('#step-2').show();
    }
  }

  function extractToken() {
    const response = hash.replace(/^#/, '').split('&').reduce((result, pair) => {
      const keyValue = pair.split('=');
      result[keyValue[0]] = keyValue[1];
      return result;
    }, {});

    document.location.hash = '';

    if (!localStorage.getItem(response.state)) {
      alert('Potential CSRF Attack');
      return;
    }

    localStorage.removeItem(response.state);

    fetch('https://api.netlify.com/api/v1/sites', {
      headers: {
        'Authorization': 'Bearer ' + response.access_token
      }
    }).then((response) => {
      response.json().then((json) => {
        output('Your sites: ' + json.map((site) => `<a href="${site.url}">${site.url}</a>`).join(','));
      });
    }).catch((error) => {
      output(`Error fetching sites: ${error}`);
    });    
  }

  function output(text) {
    $('#output').html('').html(text);
  }

  if (hash) {
    $('#step-3').show();
    extractToken();
  } else {
    $currentUrl.text(document.location.href);
    $clientIdForm.submit(submit);
    $('#step-1').show();

    state = Math.random();
    localStorage.setItem(state, true);
  }

})(window.jQuery);