(function($) {
  let state;
  const hash = document.location.hash;
  const $currentUrl  = $('#current-url');
  const $clientIdForm = $('#client-id-form');
  const $clientId = $('#client-id');
  const $authUrl = $('#auth-url');

  const $apiUrl = $('#api-url');
  const $bearer = $('#bearer');
  const $verb = $('#verb');
  const $body = $('#body');
  const $apiSubmit = $('#api-submit');
  const $response = $('#response');

  function clientIdSubmit($evt) {
    $evt.preventDefault();
    let clientId = $clientId.val();

    if (clientId) {
      let redirectURI;
      //https://app.netlify.com/authorize?
      //    client_id=cAaau0IeagbZJgTquk9bBXqxqWlNRqL2O-kpGGF4wxY&
      //    response_type=token&
      //    redirect_uri=https://stupefied-shirley-45b0a3.netlify.app/.netlify/functions/index&
      //    state=0.04749481367019781
      if (clientId === 'cAaau0IeagbZJgTquk9bBXqxqWlNRqL2O-kpGGF4wxY') { // Use the single instance redirect URL.
        redirectURI = 'https://stupefied-shirley-45b0a3.netlify.app/.netlify/functions/index';
        state = 'https://stupefied-shirley-45b0a3.netlify.app/app.html';
      } else {
        redirectURI = document.location.href;
        state = Math.random();
      }
      $authUrl.prop('href', `https://app.netlify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectURI}&state=${state}`);
      $('.step').hide();
      $('#step-2').show();
    }
  }

  function apiSubmit($evt) {
    $evt.preventDefault();
    doFetch();
  }

  function doFetch() {
    fetch($apiUrl.val().trim(), {
      method: $verb.val().trim(),
      body: $verb.val().trim().toLowerCase() === 'get' ? null : $body.val().trim(),
      headers: {
        'Authorization': 'Bearer ' + $bearer.val().trim()
      }
    }).then((response) => {
      resp(response.status);
      response.json().then((json) => {
        pl(json);
      });
    }).catch((error) => {
      pl(`Error fetching sites: ${error}`);
    });
  }

  function extractToken() {
    hsh(hash);
    const response = hash.replace(/^#/, '').split('&').reduce((result, pair) => {
      const keyValue = pair.split('=');
      result[keyValue[0]] = keyValue[1];
      return result;
    }, {});
    $bearer.val(response.access_token);
    if (response.cfg !== 'step-3') {
      document.location.hash = '';
    }
    /*if (!localStorage.getItem(response.state) && response.cfg !== 'step-3') {
      alert('Potential CSRF Attack');
      return;
    }
    localStorage.removeItem(response.state);*/
    doFetch();
  }

  function pl(content) {
    output(content, '#payload');
  }

  function resp(content) {
    output(content, '#response');
    $response.removeClass('red green');
    if ($.isNumeric(content) && content >= 200 && content <= 299) {
      $response.addClass('green');
    } else {
      $response.addClass('red');
    }
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

  if (document.location.href[document.location.href.length - 1] === '#') {
    document.location.href = document.location.href.slice(0, -1);
  }

  if (hash) {
    $('#step-3').show();
    extractToken();
    $apiSubmit.click(apiSubmit);
  } else {
    $currentUrl.text(document.location.href);
    $clientIdForm.submit(clientIdSubmit);
    $('#step-1').show();
  }

})(window.jQuery);