const radioButton=document.querySelector(".navigation__radio");
const radioStation=document.querySelector(".radio-ganres");
radioButton.addEventListener('click',function(){
    if(radioStation.classList.contains("active")){
        radioStation.classList.remove("active");
        radioButton.classList.remove("active");
        let user=document.querySelector(".user");
        user.classList.add("swiper-wrapper");
        audio.pause();
        refreshStation(user);
    }
    else{
    radioStation.classList.add("active");
    radioButton.classList.add("active")
}
});

const radioGanres=document.querySelector(".radio-ganres__container");
radioGanres.addEventListener('click', function(event){
    let target=event.target.closest(".radio-ganres__station");
    if(target){
        let targetID=target.id;
        let station=document.querySelector(`.${targetID}`);
        refreshStation(station);
        audio.pause();
    }
});
function refreshStation(station){
    let allStation=document.querySelectorAll(".radio");
    for(let i=0; i < allStation.length;i++){
        if (allStation[i]==station){allStation[i].classList.add("swiper-wrapper");}
        else{allStation[i].classList.remove("swiper-wrapper")}
    }
    let swiper = document.querySelector('.swiper-container').swiper
    refreshSwiper(swiper);
    setCompressAutor();
    offSwich();
};
