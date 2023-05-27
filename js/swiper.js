initSwiper();
function refreshSwiper(swiper){
    swiper.destroy();
    initSwiper();
}
function initSwiper(){
    new Swiper(".content",{ 
        spaceBetween:150,
        allowTouchMove: false,
        effect: 'fade',
        fadeEffect:{
            crossFade:true,
        },
        navigation: {
            nextEl: ".navigation__next",
            prevEl: ".navigation__prev",
        },
    });
}
