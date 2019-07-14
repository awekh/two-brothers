const modalWindow = {
  applyYourCV() {
    const $uploadInput = $('.form-group.upload input');
    const $uploadLabel = $('.form-group.upload label');
    const $clearBtn = $('.clear-btn');
    const $file = $('#file');
    const ATTACHED_CLASS = 'attached';
    const ERROR_CLASS = 'form-error';
    const VALID_CLASS = 'form-valid';
    function fileName() {
      $uploadInput.on('change', () => {
        const FILE_NAME = $uploadInput[0].files[0].name;
        $uploadLabel.text(`${FILE_NAME} selected`);
        if ($file.val().length === 0) {
          $file.parent().removeClass(ATTACHED_CLASS);
          $file.parent().addClass(ERROR_CLASS);
          $file.parent().find('.error-msg').fadeIn();
        } else {
          $file.parent().removeClass(ERROR_CLASS);
          $file.parent().addClass(VALID_CLASS);
          $file.parent().addClass(ATTACHED_CLASS);
          $file.parent().find('.error-msg').fadeOut();
        }
      });
      $clearBtn.on('click', () => {
        $('#file').val(null);
        $uploadLabel.text('+ Attach your CV file');
        $file.parent().removeClass('attached');
        setTimeout(() => {
          if ($file.val().length === 0) {
            $file.valid();
            console.log($file.valid());
            $file.parent().removeClass(ATTACHED_CLASS);
            $file.parent().addClass(ERROR_CLASS);
          }
        }, 2000);
      });
    }
    function init() {
      fileName();
    }
    return {
      init: init(),
    };
  },
};

export default modalWindow;
