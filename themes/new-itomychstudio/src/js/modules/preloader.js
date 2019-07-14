const preloader = {
  initPreloader() {
    const $wrapper = $('#wrapper');
    const $preloader = $('.preloader');
    function pageLoading() {
      $wrapper.fadeIn();
      $preloader.fadeOut();
    }
    function init() {
      if (!$wrapper.length) return;
      setTimeout(pageLoading, 1000);
    }
    return {
      init: init(),
    };
  },
};

export default preloader;
