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
    } else {
      name.classList.add("is-valid");
      name.classList.remove("is-invalid");
    }

    if (lastName.value == "") {
      errors.push("apellido obligatorio");
      lastname.classList.add("is-invalid");
    } else {
      lastname.classList.add("is-valid");
      lastname.classList.remove("is-invalid");
    }

    if (phone.value == "") {
      errors.push("celular obligatorio");
      phone.classList.add("is-invalid");
    } else {
      phone.classList.add("is-valid");
      phone.classList.remove("is-invalid");
    }

    if (email.value == "") {
      errors.push("email obligatorio");
      email.classList.add("is-invalid");
    } else {
      email.classList.add("is-valid");
      email.classList.remove("is-invalid");
    }

    if (address.value == "") {
      errors.push("dirección obligatorio");
      address.classList.add("is-invalid");
    } else {
      address.classList.add("is-valid");
      address.classList.remove("is-invalid");
    }

    if (password.value == "") {
      errors.push("contraseña obligatoria");
      password.classList.add("is-invalid");
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
