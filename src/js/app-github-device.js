(function($) {
  const $check = $('#check');
  const $connect = $('#connect');
  const $response = $('#response');

  function doFetch(opts={}) {
    let verb = (opts.type || 'get').toUpperCase();
    let options = Object.assign({}, opts, {
      url: opts.url,
      type: verb,
      data: verb === 'GET' ? null : (opts.data || '') .trim(),
      crossDomain: true,
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }

      //contentType: 'application/json; charset-utf-8'
      //mode: 'cors',
      //cache: 'no-cache',
    });
    return $.ajax(options
    /*{
      method: $verb.val().trim(),
      body: $verb.val().trim().toLowerCase() === 'get' ? null : $body.val().trim(),
      headers: {
        'Authorization': 'Bearer ' + $bearer.val().trim()
      }
    }*/).promise().then((response) => {
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
    
    let resp = await doFetch({
      url: 'https://github.com/login/device/code',
      type: 'POST',
      data: JSON.stringify({
        client_id: 'Iv1.46947a491cbc3796',
        scope: 'repo'
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