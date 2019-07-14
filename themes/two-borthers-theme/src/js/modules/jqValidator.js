const jqValidator = {
  checkForm() {
    const $form = $('#applyCV');
    const $file = $('#file');
    const $phone = $('.form-cv-upload input[name=phone]');
    const PHONE_MASK = '(999) 999 99 99';
    const $uploadLabel = $('.form-group.upload label');
    const $requiredFields = $('.required');
    const $succesEl = $form.find('[type="submit"]');
    const $succesTextEl = $succesEl.find('span');
    const ATTACHED_CLASS = 'attached';
    const ERROR_CLASS = 'form-error';
    const VALID_CLASS = 'form-valid';
    const SUCCESS_CLASS = 'success';
    const DEFAULT_SUBMIT_TEXT = $succesTextEl.text();
    const SUCCESS_SUBMIT_TEXT = 'Thank you for submitting';
    function formAction() {
      $('#applyCV').validate({
        rules: {
          name: {
            required: true,
            minlength: 1,
            maxlength: 150,
          },
          email: {
            required: true,
            email: true,
          },
          phone: {
            required: false,
          },
          position: {
            minlength: 2,
          },
          cv: {
            required: true,
          },
        },
        messages: {
          name: 'Please enter your name',
          email: 'Please check your email',
          phone: 'Please enter correct phone number',
          position: 'Please enter position',
          cv: 'Please attach your CV',
        },
        errorClass: 'error-msg',
        errorElement: 'span',
        submitHandler: () => {
          setTimeout(() => {
            if ($file.valid()) {
              $succesEl.addClass(SUCCESS_CLASS);
              $succesTextEl.text(SUCCESS_SUBMIT_TEXT);
              setTimeout(() => {
                $uploadLabel.text('+ Attach your CV file');
                $form[0].reset();
                $file.val(null);
                $file.parent().removeClass(ATTACHED_CLASS);
                $succesEl.removeClass(SUCCESS_CLASS);
                $succesTextEl.text(DEFAULT_SUBMIT_TEXT);
              }, 100);
            }
          }, 2000);
        },
      });
    }
    const formCheck = {
      cv_file: () => {
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
      },
    };
    function formGet() {
      $form.submit((event) => {
        event.preventDefault();
        function checkForChanges() {
          $requiredFields.each(function () {
            if ($(this).hasClass('error-msg')) {
              $(this).parent().addClass(ERROR_CLASS);
            } else {
              $(this).parent().removeClass(ERROR_CLASS);
            }
          });
        }
        formCheck.cv_file();
        $file.valid();
        checkForChanges();
        const formData = new FormData();
        $.each($('[name=cv]')[0].files, (i, file) => {
          formData.append('cv', file);
        });
        $.each($form.serializeArray(), (k, v) => {
          formData.set(v.name, v.value);
        });
        if ($file.valid() && $requiredFields.valid()) {
          jQuery.ajax({
            url: '/api/send_cv.php',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            type: 'POST',
            dataType: 'json',
          });
        }
      });
    }
    function init() {
      if (!$form.length) return;
      formAction();
      $phone.change(formCheck.cv_phone).mask(PHONE_MASK, {
        autoclear: true,
        placeholder: '',
      });
      $requiredFields.each(function () {
        $(this).on('change keyup blur input paste focusout', () => {
          if ($(this).hasClass('error-msg')) {
            $(this).parent().addClass(ERROR_CLASS);
          } else {
            $(this).parent().removeClass(ERROR_CLASS);
            $(this).parent().addClass(VALID_CLASS);
          }
        });
      });
      formGet();
    }
    return {
      init: init(),
    };
  },
};
export default jqValidator;
