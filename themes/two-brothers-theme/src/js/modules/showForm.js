const showForm = {
  handler() {
    const $button = $('.show-form');
    const $form = $('#order-form');
    function show() {
      $button.on('click', () => {
        $button.fadeOut();
        $form.fadeIn();
      });
    }
    return {
      init: show(),
    };
  },
};

export default showForm;
