const contactForm = {
  toDo() {
    const $form = $('#contact-form');
    const $succesEl = $form.find('[type="submit"]');
    const SUCCESS_CLASS = 'success';
    const ERROR_CLASS = 'form-error';
    const VALID_CLASS = 'form-valid';
    const $requiredFields = $('.required');
    function checkForValid() {
      $form.validate({
        rules: {
          name: {
            required: true,
            minlength: 2,
            maxlength: 150,
          },
          email: {
            required: true,
            email: true,
          },
        },
        messages: {
          name: 'Please enter your name',
          email: 'Please check your email',
        },
        errorClass: 'error-msg',
        errorElement: 'span',
        submitHandler: () => {
          setTimeout(() => {
            $succesEl.addClass(SUCCESS_CLASS);
            $form[0].reset();
            setTimeout(() => {
              $succesEl.removeClass(SUCCESS_CLASS);
            }, 3000);
          }, 3000);
        },
      });
    }
    function formGet() {
      $form.submit((event) => {
        event.preventDefault();
        checkForValid();
        function checkForChanges() {
          $requiredFields.each(function () {
            if ($(this).hasClass('error-msg')) {
              $(this).parent().addClass(ERROR_CLASS);
            } else {
              $(this).parent().removeClass(ERROR_CLASS);
            }
          });
        }

        checkForChanges();
        const formData = new FormData();
        $.each($form.serializeArray(), (k, v) => {
          formData.set(v.name, v.value);
        });
        if ($requiredFields.valid()) {
          jQuery.ajax({
            url: '/api/contact_us.php',
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
      checkForValid();
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
export default contactForm;
