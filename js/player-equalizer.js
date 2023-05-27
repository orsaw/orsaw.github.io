
const equalizer = document.querySelector(".equalizer");
const equalizerButton = document.querySelector(".equalizer__button");
equalizerButton.addEventListener('click', function () {
    if (equalizer.classList.contains("active")) { equalizer.classList.remove("active"); }
    else { equalizer.classList.add("active"); }
    setCompressAutor()
});

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext;
var source;
var equalizedAudio=[];

function createEqFilter(frequency) {
    let filter = audioContext.createBiquadFilter();
    filter.type = 'peaking';
    filter.frequency.value = frequency;
    filter.Q.value = 1;
    filter.gain.value = 0;
    return filter;
};

function createAllFilters() {
    let frequencyList = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
    let filters = frequencyList.map(createEqFilter);
    filters.reduce(function (prev, curr) {
        prev.connect(curr);
        return curr;
    });

    return filters;
}

function equalize(audio) {
    audioContext = audioContext || new AudioContext();
    if(!equalizedAudio.includes(audio)){
        source = audioContext.createMediaElementSource(audio);
        equalizedAudio.push(audio);
    }
    else{return;}
    let filters = createAllFilters();
    source.connect(filters[0]);
    var eqSliders = document.querySelectorAll(".equalizer__slider");
    eqSliders.forEach(function (slider, i) {
        slider.addEventListener('input', function (e) {
            filters[i].gain.value = e.target.value/3;
        }, false);
    });
    filters[filters.length - 1].connect(audioContext.destination);
    loadFilter(filters,eqSliders);
};
function linkSlidersToFilters(event, i, filters) {
    filters[i].gain.value = event.target.value;
};
function loadFilter(filters,eqSliders){
    for(let i=1; i<10;i++){
        filters[i].gain.value=eqSliders[i].value
    }
}