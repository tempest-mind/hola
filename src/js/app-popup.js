(function($) {
  const $check = $('#check');
  const $connect = $('#connect');
  
  let authWindow;

  //https://app.netlify.com/authorize?client_id=I4rJ2VScjlRs5MDn9XEzDXb9gBHi0RU-vuhIoVaNRy0&response_type=token&redirect_uri=https://5f76325e8f1110b51d0f78f4--stupefied-shirley-45b0a3.netlify.app/app.html&state=0.5998507906337096

  function connect($evt) {
    $evt.preventDefault();
    authWindow = window.open('https://app.netlify.com/authorize?client_id=cAaau0IeagbZJgTquk9bBXqxqWlNRqL2O-kpGGF4wxY&response_type=ticket&ticket=7c77cff74583ef91ac1c09c195b69fff&redirect_uri=https://stupefied-shirley-45b0a3.netlify.app/.netlify/functions/index&state=https://stupefied-shirley-45b0a3.netlify.app/app.html', 'auth', 'height=700,width=450');
  }
  $connect.click(connect);

  function check($evt) {
    $evt.preventDefault();
    console.log('authWindow', authWindow);
  }
  $check.click(check);

})(window.jQuery);