import hamburger from './modules/hamburger';
import stickyHeader from './modules/sticky';
import accordion from './modules/accordion';

(($) => {
  // When DOM is ready
  $(() => {
    stickyHeader.handler();
    hamburger.handler();
    accordion.handler();
  });
})(jQuery);
