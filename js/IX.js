(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $(document).ready(function() {
        $('select').material_select();
      });

      $('.datepicker').pickadate({
          selectMonths: true,
          selectYears: 15,
          format: 'yyyy-mm-dd',
          today: 'Today',
          clear: 'Clear',
          close: 'Ok',
          closeOnSelect: false
        });

        $('.timepicker').pickatime({
      default: 'now',
      fromnow: 0,
      twelvehour: false,
      donetext: 'OK',
      cleartext: 'Clear',
      canceltext: 'Cancel',
      autoclose: false,
      ampmclickable: true,
      aftershow: function(){}
      
    });





  }); // end of document ready
})(jQuery); // end of jQuery name space
