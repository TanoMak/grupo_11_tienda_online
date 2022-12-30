window.onload = function () {
    let cancel = document.querySelector(".cancel")
    let preDelete = document.querySelector(".delete-btn")
    let modal = document.querySelector(".modal")
    let modalC = document.querySelector(".modal-container")

    preDelete.addEventListener("click", function(e){
        e.preventDefault();
        modalC.style.opacity = "1"
        modalC.style.visibility = "visible"
        modal.classList.toggle("modal-close")
    })

    cancel.addEventListener("click", function(){
        modal.classList.toggle("modal-close")
        setTimeout(function(){
            modalC.style.opacity = "0"
            modalC.style.visibility = "hidden"
        },700)
    })

}



