(function($) {
  const $check = $('#check');
  const $connect = $('#connect');
  
  function connect($evt) {
    $evt.preventDefault();
    console.log('connect');
  }
  $connect.click(connect);

  function check($evt) {
    $evt.preventDefault();
    console.log('check');
  }
  $check.click(check);

})(window.jQuery);