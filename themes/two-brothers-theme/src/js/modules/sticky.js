const stickyHeader = {
  handler() {
    const $window = $(window);
    const $header = $('.header');
    const $sticky = 10;

    function onScroll() {
      $window.on('scroll', () => {
          console.log($sticky);
        if ($window.scrollTop() > $sticky) {
          $header.addClass('sticky');
          console.log('123');
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
