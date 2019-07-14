const customSelect = {
  selectInit() {
    const $selectTarget = $('.customSelectBox');
    function initing() {
      $selectTarget.select2({
        minimumResultsForSearch: Infinity,
      });
    }
    function init() {
    //   if (!$selectTarget.length) return;
      initing();
    }
    return {
      init: init(),
    };
  },
};

export default customSelect;
