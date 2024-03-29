const stickyHeader = {
  handler() {
    const $window = $(window);
    const $header = $('.header');
    const $sticky = 10;

    function onScroll() {
      $window.on('scroll', () => {
        if ($window.scrollTop() > $sticky) {
          $header.addClass('sticky');
        } else {
          $header.removeClass('sticky');
        }
      });
    }
    return {
      init: onScroll(),
    };
  },
};

export default stickyHeader;
