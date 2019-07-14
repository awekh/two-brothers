const footerDate = {
  setDate() {
    const $currentYear = $('#currentYear');
    function setCurrentDate() {
      $currentYear.text((new Date()).getFullYear());
    }
    function init() {
      if (!$currentYear.length) return;
      setCurrentDate();
    }
    return {
      init: init(),
    };
  },
};

export default footerDate;
