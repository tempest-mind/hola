(function($) {
  const $connect = $('#connect');

  //https://app.netlify.com/authorize?client_id=I4rJ2VScjlRs5MDn9XEzDXb9gBHi0RU-vuhIoVaNRy0&response_type=token&redirect_uri=https://5f76325e8f1110b51d0f78f4--stupefied-shirley-45b0a3.netlify.app/app.html&state=0.5998507906337096

  function connect($evt) {
    $evt.preventDefault();
    console.log('click');
  }

  $connect.click(connect);

})(window.jQuery);