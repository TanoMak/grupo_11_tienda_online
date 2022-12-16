window.onload = function () {
  let form = document.getElementById("conteinerId");
  form.email.focus();

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

  form.addEventListener("submit", function (e) {
    let errors = [];

    let email = document.querySelector("#email");

    let password = document.querySelector("#password");

    if (email.value == "") {
      errors.push("email obligatorio");
      email.classList.add("is-invalid");
      email.classList.remove("is-valid");
    } else {
      email.classList.add("is-valid");
      email.classList.remove("is-invalid");
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
  });
};
