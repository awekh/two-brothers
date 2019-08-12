// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

// import {NAME} from './modules/...';
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
