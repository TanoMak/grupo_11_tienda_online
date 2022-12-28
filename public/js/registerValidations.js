window.onload = function () {
  let form = document.querySelector(".container");
  form.name.focus();

  let name = document.querySelector("#name");

  name.addEventListener("blur", (e) => {
    let nameError = document.querySelector(".nameError");

    if (name.value == "") {
      nameError.innerHTML = "Nombre obligatorio";
      nameError.classList.add("is-invalid");
      nameError.classList.remove("is-valid");
    } else {
      nameError.classList.add("is-valid");
      nameError.classList.remove("is-invalid");
      nameError.innerHTML = "";
    }
  });

  let lastName = document.querySelector("#lastname");

  lastName.addEventListener("blur", (e) => {
    let lastNameError = document.querySelector(".lastNameError");

    if (lastName.value == "") {
      lastNameError.innerHTML = "Apellido obligatorio";
      lastNameError.classList.add("is-invalid");
      lastNameError.classList.remove("is-valid");
    } else {
      lastNameError.classList.add("is-valid");
      lastNameError.classList.remove("is-invalid");
      lastNameError.innerHTML = "";
    }
  });

  let phone = document.querySelector("#phone");

  phone.addEventListener("blur", (e) => {
    let phoneError = document.querySelector(".phoneError");

    if (phone.value == "") {
      phoneError.innerHTML = "Telefono obligatorio";
      phoneError.classList.add("is-invalid");
      phoneError.classList.remove("is-valid");
    } else {
      phoneError.classList.add("is-valid");
      phoneError.classList.remove("is-invalid");
      phoneError.innerHTML = "";
    }
  });

  let email = document.querySelector("#email");

  email.addEventListener("blur", (e) => {
    let emailError = document.querySelector(".emailError");

    if (email.value == "") {
      emailError.innerHTML = "E-mail obligatorio";
      emailError.classList.add("is-invalid");
      emailError.classList.remove("is-valid");
    } else {
      emailError.classList.add("is-valid");
      emailError.classList.remove("is-invalid");
      emailError.innerHTML = "";
    }
  });

  let password = document.querySelector("#password");

  password.addEventListener("blur", (e) => {
    let passwordError = document.querySelector(".passwordError");

    if (password.value == "") {
      passwordError.innerHTML = "Contraseña obligatoria";
      passwordError.classList.add("is-invalid");
      passwordError.classList.remove("is-valid");
    } else {
      passwordError.classList.add("is-valid");
      passwordError.classList.remove("is-invalid");
      passwordError.innerHTML = "";
    }
  });

  let address = document.querySelector("#address");

  address.addEventListener("blur", (e) => {
    let addressError = document.querySelector(".addressError");

    if (address.value == "") {
      addressError.innerHTML = "Dirección obligatoria";
      addressError.classList.add("is-invalid");
      addressError.classList.remove("is-valid");
    } else {
      addressError.classList.add("is-valid");
      addressError.classList.remove("is-invalid");
      addressError.innerHTML = "";
    }
  });



  /* form.addEventListener("submit", function (e) {
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
      ulError.classList.add("is-invalid");
    } else {
      alert("Logueado satisfactoriamente");
    }
  }); */
};
