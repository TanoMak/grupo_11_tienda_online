window.onload = function () {
    let form = document.querySelector(".container");
    form.code.focus();

    // Se caputuran lasetiqetas de error de cada input //

    let errorMesg1 = document.querySelector("#error-front-msg-1")
    let errorMesg2 = document.querySelector("#error-front-msg-2")
    let errorMesg3 = document.querySelector("#error-front-msg-3")
    let errorMesg4 = document.querySelector("#error-front-msg-4")
    let errorMesg5 = document.querySelector("#error-front-msg-5")
    let errorMesg6 = document.querySelector("#error-front-msg-6")
    let errorMesg7 = document.querySelector("#error-front-msg-7")

    // Se captura cada input //


    let codigo = document.querySelector("#code")
    let nombre = document.querySelector("#name")
    let descripcion = document.querySelector("#description")
    let precio = document.querySelector("#price")
    let linea = document.querySelector("#line")
    let categoria = document.querySelector("#category")
    let color = document.querySelector("#color")

   
    
    

    codigo.addEventListener("blur", function(){
        if (codigo.value == "" || codigo.value.length >5){
            errorMesg1.innerHTML =" <p>El codigo no puede estar vacio y debe tener como maximo 5 caracteres</p>"
            codigo.style.borderColor = ("red")
            form.code.focus();
            
        }else{
            codigo.style.borderColor = ("green")
            errorMesg1.innerHTML =""
        }
    
    })
    nombre.addEventListener("blur", function(){
        if (nombre.value == "" || nombre.value.length <5){
            nombre.style.borderColor = ("red")
            errorMesg2.innerHTML =" <p>El nomnbre no puede estar vacio y debe tener como minimo 5 caracteres</p>"
            form.name.focus();
        
        }else{
            nombre.style.borderColor = ("green")
            errorMesg2.innerHTML =""
        }
    
    })
    descripcion.addEventListener("blur", function(){
        if (descripcion.value == "" || descripcion.value.length <20){
            descripcion.style.borderColor = ("red")
            errorMesg3.innerHTML =" <p>Las descripcion debe tener al menos 20 caracteres</p>"
            form.descripcion.focus();
        
        }else{
            descripcion.style.borderColor = ("green")
            errorMesg3.innerHTML =""
        }
    
    })
    precio.addEventListener("blur", function(){
        if (precio.value == ""){
            precio.style.borderColor = ("red")
            errorMesg4.innerHTML =" <p>El producto debe tener un precio</p>"
            form.precio.focus();
        
        }else{
            precio.style.borderColor = ("green")
            errorMesg4.innerHTML =""
        }
    
    })
    linea.addEventListener("blur", function(){
        if (linea.value == ""){
            linea.style.borderColor = ("red")
            errorMesg5.innerHTML =" <p>Seleccione una linea</p>"
            form.linea.focus();
        
        }else{
            linea.style.borderColor = ("green")
            errorMesg5.innerHTML =""
        }
    
    })
    categoria.addEventListener("blur", function(){
        if (categoria.value == ""){
            categoria.style.borderColor = ("red")
            errorMesg6.innerHTML =" <p>Seleccione una categoria</p>"
            form.linea.focus();
        
        }else{
            categoria.style.borderColor = ("green")
            errorMesg6.innerHTML =""
        }
    
    })

}





