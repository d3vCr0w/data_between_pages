$(() => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  if (Object.keys(params).length > 0) {
    //Comes from query params
    $('#title').text('Data From Query Params');
    const age = calculate_age(new Date(params.birthday));
    $('#fullName').text(params.fullName);
    $('#age').text(age);
  } else {
    //Search in localStorage
    $('#title').text('Data From Local Storage');
    const fullName = window.localStorage.getItem('fullName');
    const birthday = window.localStorage.getItem('birthday');

    const age = calculate_age(new Date(birthday));
    $('#fullName').text(fullName);
    $('#age').text(age);
  }
});

function calculate_age(dob) {
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}
