const accordion = {
  handler() {
    function clickTitle() {
      $('.title-sm').on('click', function () {
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
          $(this).siblings('.descr-sm').slideUp(200);
        } else {
          $('.title-sm').removeClass('active');
          $(this).addClass('active');
          $('.descr-sm').slideUp(200);
          $(this).siblings('.descr-sm').slideDown(200);
        }
      });
    }
    return {
      init: clickTitle(),
    };
  },
};

export default accordion;
