window.onload = function () {

  let form = document.querySelector(".container");
  form.name.focus();


  form.addEventListener("submit", function (e) {
    let errors = [];

    let name = document.querySelector("#name");
    let lastName = document.querySelector("#lastname");
    let phone = document.querySelector("#phone");
    let email = document.querySelector("#email");
    let address = document.querySelector("#address");
    let password = document.querySelector("#password");

    if (name.value == "") {
      errors.push("nombre obligatorio");
      name.classList.add("is-invalid");
      name.classList.remove("is-valid");
    } else {
      name.classList.add("is-valid");
      name.classList.remove("is-invalid");
    }

    if (lastName.value == "") {
      errors.push("apellido obligatorio");
      lastName.classList.add("is-invalid");
      lastName.classList.remove("is-valid");
    } else {
      lastName.classList.add("is-valid");
      lastName.classList.remove("is-invalid");
    }

    if (phone.value == "") {
      errors.push("celular obligatorio");
      phone.classList.add("is-invalid");
      phone.classList.remove("is-valid");
    } else {
      phone.classList.add("is-valid");
      phone.classList.remove("is-invalid");
    }

    if (email.value == "") {
      errors.push("email obligatorio");
      email.classList.add("is-invalid");
      email.classList.remove("is-valid");
    } else {
      email.classList.add("is-valid");
      email.classList.remove("is-invalid");
    }

    if (address.value == "") {
      errors.push("dirección obligatorio");
      address.classList.add("is-invalid");
      address.classList.remove("is-valid");
    } else {
      address.classList.add("is-valid");
      address.classList.remove("is-invalid");
    }

    if (password.value == "") {
      errors.push("contraseña obligatoria");
      password.classList.add("is-invalid");
      password.classList.remove("is-valid");
    } else {
      password.classList.add("is-valid");
      password.classList.remove("is-invalid");
    }

    if (errors.length > 0) {
      e.preventDefault();
      let ulError = document.querySelector(".errors");
      ulError.innerHTML = "";
      for (let i = 0; i < errors.length; i++) {
        ulError.innerHTML += "<li>" + errors[i] + "<li/>";
      }
    }
  });
};
