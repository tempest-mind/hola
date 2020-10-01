(function($) {
  let state;
  const hash = document.location.hash;
  const $currentUrl  = $('#current-url');
  const $clientIdForm = $('#client-id-form');
  const $clientId = $('#client-id');
  const $authUrl = $('#auth-url');

  function submit($evt) {
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
    hsh(hash);
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
      resp(response);
      response.json().then((json) => {
        pl(json);
      });
    }).catch((error) => {
      pl(`Error fetching sites: ${error}`);
    });    
  }

  function pl(content) {
    output(content, '#payload');
  }

  function resp(content) {
    output(content, '#response');
  }

  function hsh(content) {
    output(content, '#hash');
  }

  function output(content, selector) {
    $(selector).text('');
    try {
      $(selector).text(JSON.stringify(content, null, 2));
    } catch (e) {
      $(selector).text(content);
    }
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