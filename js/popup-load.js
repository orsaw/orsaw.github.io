const popup = document.querySelector(".popup-load");
const openPopup = document.querySelector(".navigation__load-button");
const closePopup = document.querySelector(".popup-load__exit");
openPopup.addEventListener('click', function () { popup.classList.add("active"); });
closePopup.addEventListener('click', function () { popup.classList.remove("active"); });

const form = document.forms.load;
const formInput = form.fileInput;
const formLoad = form.fileLoad;

formInput.addEventListener('input', function () {
    let error = document.querySelectorAll(".popup-load__name");
    if (error.length>=1){
        error[0].outerHTML = "";
    }
    form.insertAdjacentHTML(
        "afterend",
        `<span class="popup-load__name">Имя файла: ${formInput.files[0].name}</span>`
    )
})
formLoad.addEventListener('click', function (){
    loadFile();
    popup.classList.remove("active");
    setCompressAutor();
})
function setCompressAutor(){
    let autorContainer = document.querySelector(".swiper-slide-active .song__autor-container");
    let equalizer = document.querySelector(".equalizer");
    if(equalizer.classList.contains("active")){
        autorContainer.classList.add("compress");
    }
    else{autorContainer.classList.remove("compress");}
}
