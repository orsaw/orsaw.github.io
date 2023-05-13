const swich = document.querySelector(".navigation__swich");
const playerSlider = document.querySelector(".player__slider");
const replaySong = document.querySelector(".navigation__replay");
const nextSong = document.querySelector(".navigation__next");
const prevSong = document.querySelector(".navigation__prev");
const buttonVolumeSong=document.querySelector(".navigation__volume-button");
const volumeSong=document.querySelector(".navigation__volume-slider");

swich.addEventListener('click', function () {
    let audio = refreshSong();
    if (swich.classList.contains("active")) {
        audio.pause();
        offSwich()
    }
    else {
        equalize(audio);
        audio.play();
        onSwich();
    }
});


function addAudioEvents(audio){
    document.querySelectorAll(".swich_btn").forEach(
        swichButton=>swichButton.addEventListener('click',clickSwichBtn));

    audio.addEventListener('ended',endedSong);

    audio.addEventListener('timeupdate',timeupdateSong);

    playerSlider.addEventListener('click',clickPlayer);

    volumeSong.addEventListener('input',inputVolume);

    function clickSwichBtn (){
        audio.pause();
        audio.currentTime=0;
        playerSlider.value=0;
        cleanPreviousSong(audio);
        let newAudio = refreshSong();
        if(!swich.classList.contains("active")){swich.classList.add("active");}
        setCompressAutor()
        newAudio.play();
        equalize(newAudio);
    }

    function endedSong (){
        if(replaySong.classList.contains("active")){
            audio.play();
        }
        else{
            if(document.querySelectorAll(".swiper-slide").length>1){
                nextSong.click();
                cleanPreviousSong(audio);
                if(!swich.classList.contains("active")){swich.classList.add("active");}
                let newAudio = refreshSong();
                setCompressAutor();
                newAudio.play();
                equalize(newAudio);
            }
            else{
                offSwich();
            }
        }
    }

    function timeupdateSong (){
        let date = new Date(audio.currentTime * 1000);
        let audioLength = document.querySelector(".player__duration");
        counterAppearance(date, audioLength);
    
        let duration = audio.duration;
        let currentTime = audio.currentTime;
        playerSlider.value = currentTime / duration * 100000;
    }

    function clickPlayer (){
        let sliderValue = playerSlider.value;
        let duration = audio.duration;
        audio.currentTime = sliderValue / 100000 * duration;
    };

    function inputVolume (){
        let volumeProcent=document.querySelector(".navigation__slider-counter");
        volumeProcent.innerHTML=volumeSong.value+"%";
        audio.volume=volumeSong.value/100;
        refreshVolumeImage();
    };

    function cleanPreviousSong(audio){
        audio.removeEventListener('ended',endedSong);
        audio.removeEventListener('timeupdate',timeupdateSong);
        playerSlider.removeEventListener('click',clickPlayer);
        document.querySelectorAll(".swich_btn").forEach(
            swichButton=>swichButton.removeEventListener('click',clickSwichBtn));
    }
}

buttonVolumeSong.addEventListener("click",function(){
    let volumeContainer=document.querySelector(".navigation__slider-container");
    if(volumeContainer.classList.contains("active")){volumeContainer.classList.remove("active");}
    else{volumeContainer.classList.add("active");}
})

replaySong.addEventListener('click',function(){
    if(replaySong.classList.contains("active")){replaySong.classList.remove("active")}
    else{replaySong.classList.add("active")};
});

function refreshVolumeImage(){
    let volumeBtnImage=document.querySelector(".navigation__volume-img");
    switch(Math.ceil(volumeSong.value/33)){
        case 0:
            volumeBtnImage.setAttribute('src',"img/icon/icons5-none.png")
            break;
        case 1:
            volumeBtnImage.setAttribute('src',"img/icon/icons5-low.png")
            break;
        case 2:
            volumeBtnImage.setAttribute('src',"img/icon/icons5-mid.png")
            break;
        case 3:
            volumeBtnImage.setAttribute('src',"img/icon/icons5-max.png")
            break;
    }
}
function refreshSong() {

    audio = document.querySelector(".swiper-slide-active audio");
    addAudioEvents(audio);
    audio.volume=volumeSong.value/100;
    return audio;
}

function onSwich() {
    let logo = document.querySelector(".logo");
    let picture = document.querySelector(".song__cover")
    swich.classList.add("active");
    logo.classList.add("active");
    picture.classList.add("active");
}

function offSwich() {
    let logo = document.querySelector(".logo");
    let picture = document.querySelector(".song__cover")
    swich.classList.remove("active");
    logo.classList.remove("active");
    picture.classList.remove("active");
}

function counterAppearance(date, audioLength) {
    if (date.getSeconds() < 10) {
        var seconds = `0${date.getSeconds()}`
    }
    else { var seconds = date.getSeconds(); }
    audioLength.innerHTML = "0" + date.getMinutes() + ":" + seconds;
}
function loadFile(input) {
    var file = formInput.files[0],
        url = file.urn || file.name;

    ID3.loadTags(url, function () {
        showTags(url);
    }, {
        tags: ["title", "artist", "picture"],
        dataReader: ID3.FileAPIReader(file)
    });
}

function showTags(url) {
    var tags = ID3.getAllTags(url);
    let src = URL.createObjectURL(formInput.files[0]);
    let title = tags.title || formInput.files[0].name;
    let autor = tags.artist || "Не указано";
    var image = tags.picture;
    if (image) {
        var base64String = "";
        for (var i = 0; i < image.data.length; i++) {
            base64String += String.fromCharCode(image.data[i]);
        }
        var base64 = "data:" + image.format + ";base64," +
            window.btoa(base64String);
        var picture = base64;
    } else {
        var picture = "/img/cover1_rqnbjm.png";
    }
    document.querySelector(".user").insertAdjacentHTML(
        "beforeend",
        `<div class="swiper-slide">
        <div class="song">
            <div class="song__cover">
                <img src="${picture}" id="picture">
            </div>
            <div class="song__autor-container">
                <div class="song__autor" id="autor">${autor}</div>
                </div>
            <div class="song__title" id="title">${title}</div>
            <audio class="player__audio" src="${src}" preload="metadata"></audio>
        </div>
    </div>
    `)
}
