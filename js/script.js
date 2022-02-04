$(() => {
  const today = new Date().toISOString().split('T')[0];
  $('#birthday').attr('max', today);

  jQuery.validator.addMethod('lettersonly', function (value, element) {
    return this.optional(element) || /^[a-z]+$/i.test(value);
  });

  $('#inputForm').validate({
    rules: {
      fullName: {
        required: true,
        lettersonly: true,
      },
      birthday: {
        required: true,
        date: true,
        max: today,
      },
    },
    messages: {
      fullName: {
        required: 'Please enter your full name',
        lettersonly: 'Full name must contain only letters',
      },
      birthday: {
        required: 'Please enter your date of birth',
        max: `Your date of birth should not be greater than ${today}`,
      },
    },
  });

  $('#sendLocalStorage').on('click', function () {
    if ($('#inputForm').valid()) {
      if (typeof Storage !== 'undefined') {
        const fullName = $('#fullName').val();
        const birthday = $('#birthday').val();
        window.localStorage.setItem('fullName', fullName);
        window.localStorage.setItem('birthday', birthday);

        window.location.href = `view.html`;
      } else {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'This browser does not support Local Storage!',
        });
      }
    } else {
      showInvalidInputError();
    }
  });

  $('#sendQueryParams').on('click', function () {
    if ($('#inputForm').valid()) {
      const fullName = $('#fullName').val();
      const birthday = $('#birthday').val();
      window.location.href = `view.html?fullName=${fullName}&birthday=${birthday}`;
    } else {
      showInvalidInputError();
    }
  });
});

const showInvalidInputError = () => {
  swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Invalid input data!',
  });
};
