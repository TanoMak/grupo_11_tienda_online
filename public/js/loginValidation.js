window.onload = function () {

    let form = document.getElementById("conteinerId");
    form.email.focus()

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
        }
      });
    }