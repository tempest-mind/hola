(function($) {
  const $check = $('#check');
  const $connect = $('#connect');
  const $response = $('#response');

  function doFetch(url = '', opts = {}) {
    let verb = (opts.method || 'get').toUpperCase();
    let options = Object.assign({}, opts, {
      method: verb,
      body: verb === 'GET' ? null : (opts.body || '') .trim(),
      mode: 'cors',
      cache: 'no-cache'
    });
    return fetch(url.trim(), options
    /*{
      method: $verb.val().trim(),
      body: $verb.val().trim().toLowerCase() === 'get' ? null : $body.val().trim(),
      headers: {
        'Authorization': 'Bearer ' + $bearer.val().trim()
      }
    }*/).then((response) => {
      resp(response.status);
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
    $response.removeClass('red green');
    if ($.isNumeric(content) && content >= 200 && content <= 299) {
      $response.addClass('green');
    } else {
      $response.addClass('red');
    }
  }

  function output(content, selector) {
    $(selector).text('');
    try {
      $(selector).text(JSON.stringify(content, null, 2));
    } catch (e) {
      $(selector).text(content);
    }
  }

  const connect = async ($evt) => {
    $evt.preventDefault();
    console.log('connect');
    
    let resp = await doFetch('https://api.netlify.com/api/v1/oauth/tickets', {
      method: 'POST',
      body: JSON.stringify({
        client_id: 'cAaau0IeagbZJgTquk9bBXqxqWlNRqL2O-kpGGF4wxY'
      })
    });

    console.log('resp', resp);

    /**
     * Create ticket
     * Authorize ticket (popup)
     * Get access token
     * + Poll for showTicket
     * + Exchange ticket and return access token
     */
  }
  $connect.click(connect);

  function check($evt) {
    $evt.preventDefault();
    console.log('check');
  }
  $check.click(check);

})(window.jQuery);