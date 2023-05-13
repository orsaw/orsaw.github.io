new Swiper(".content",{ 
    spaceBetween:150,
    simulateTouch:true,
    effect: 'fade',
    fadeEffect:{
        crossFade:true,
    },
    navigation: {
        nextEl: ".navigation__next",
        prevEl: ".navigation__prev",
    },
});

function refreshSwiper(swiper){
    swiper.destroy();
    new Swiper(".content",{ 
        spaceBetween:150,
        simulateTouch:true,
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