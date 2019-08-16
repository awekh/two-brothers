import hamburger from './modules/hamburger';
import stickyHeader from './modules/sticky';
import accordion from './modules/accordion';
import showForm from './modules/showForm';

(($) => {
  // When DOM is ready
  $(() => {
    stickyHeader.handler();
    hamburger.handler();
    accordion.handler();
    showForm.handler();
  });
})(jQuery);
