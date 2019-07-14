const tabs = {
  careerTabs() {
    const $tab = $('.card-vacancy-action');
    const $tabContainer = $('.tab_container');
    const $tabContent = $('.tab_content');
    const $accordion = $('.tab_accordion');
    const TAB_ACTIVE_CLASS = 'active';
    const $page = $('html, body');
    function desktopTabs() {
      $tab.on('click', function (event) {
        if ($(this).hasClass('active')) {
          event.preventDefault();
        } else {
          event.preventDefault();
          const $relValue = $(this).attr('rel');
          const $content = $tabContainer.find(`[id=${$relValue}]`);
          $tab.removeClass(TAB_ACTIVE_CLASS);
          $tabContent.hide();
          $(this).addClass(TAB_ACTIVE_CLASS);
          $content.fadeIn();
          if (window.history.pushState) {
            const $hash = `#${$relValue}`;
            window.history.pushState(null, null, $hash);
            event.preventDefault();
            $page.animate({ scrollTop: 0 }, 500);
            $page.on('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', () => {
              $page.stop();
            });
          } else {
            const $hash = `#${$relValue}`;
            window.location.hash = $hash;
            event.preventDefault();
            $page.animate({ scrollTop: 0 }, 500);
            $page.on('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', () => {
              $page.stop();
            });
          }
        }
      });
    }
    function accordion() {
      $accordion.on('click', function () {
        $accordion.not($(this)).removeClass(TAB_ACTIVE_CLASS);
        $tabContent.fadeOut();
        const $relValue = $(this).attr('rel');
        const $content = $tabContainer.find(`[id=${$relValue}]`);
        $(this).toggleClass(TAB_ACTIVE_CLASS);
        $content.toggle();
        document.location.hash = $(this).attr('rel');
      });
      if (document.location.hash.length > 0) {
        $tabContent.hide();
        $tab.removeClass(TAB_ACTIVE_CLASS);
        const HASH = document.location.hash.split('#')[1];
        const $currentVacancy = $tabContainer.find(`[id="${HASH}"]`);
        const $currentTab = $('.tabs').find(`[rel="${HASH}"]`);
        const $currentAcc = $tabContainer.find(`[rel="${HASH}"]`);
        $currentTab.addClass(TAB_ACTIVE_CLASS);
        $currentAcc.addClass(TAB_ACTIVE_CLASS);
        $currentVacancy.fadeIn();
      }
    }
    function init() {
      if (!$tab.length) return;
      desktopTabs();
      accordion();
      // if (SCREEN_WIDTH > 768) $tabContainer.find('[id="tab1"]').fadeIn();
    }
    return {
      init: init(),
    };
  },
};

export default tabs;
