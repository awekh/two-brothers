// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

// import {NAME} from './modules/...';
// import mapApi from './modules/map';
import modalWindow from './modules/modal';
import tabs from './modules/vacancyTab';
import footerDate from './modules/footerDate';
import jqValidator from './modules/jqValidator';
import contactForm from './modules/contactForm';
import preloader from './modules/preloader';
import navbar from './modules/navbar';

(($) => {
  // When DOM is ready
  $(() => {
    preloader.initPreloader();
    jqValidator.checkForm();
    modalWindow.applyYourCV();
    tabs.careerTabs();
    footerDate.setDate();
    contactForm.toDo();
    navbar.responsiveNavbar();
  });
})(jQuery);
