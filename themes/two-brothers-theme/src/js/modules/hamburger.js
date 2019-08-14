const hamburger = {
  handler() {
    const $body = $('body');
    const $btn = $('.menu-toggler');
    const $menu = $('.header-container');
    const OPENED_CLASS = 'opened';
    const OVERLAY_CLASS = 'overlay';

    function hamburgerToggle() {
      $btn.on('click', function switcher() {
          $(this).toggleClass(OPENED_CLASS);
          $menu.toggleClass(OPENED_CLASS);
          $body.toggleClass(OVERLAY_CLASS);
        });
    }

    function init() {
        if (!$btn.length) return;
        hamburgerToggle();
    }
    return {
        init: init(),
    };
  },
};

export default hamburger;