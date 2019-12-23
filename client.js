// client-side js
// run by the browser each time your view template is loaded

const key1 = "https://cdn.glitch.com/c4e65900-d574-4a30-ab84-cd913b7fa895%2Fkey-1.svg?1537296608517";
const key2 = "https://cdn.glitch.com/c4e65900-d574-4a30-ab84-cd913b7fa895%2Fkey-2.svg?1537295201513";
const key3 = "https://cdn.glitch.com/c4e65900-d574-4a30-ab84-cd913b7fa895%2Fkey-3.svg?1537295201642";
const key4 = "https://cdn.glitch.com/c4e65900-d574-4a30-ab84-cd913b7fa895%2Fkey-4.svg?1537295201697";
const key5 = "https://cdn.glitch.com/c4e65900-d574-4a30-ab84-cd913b7fa895%2Fkey-5.svg?1537295201820";
const key6 = "https://cdn.glitch.com/c4e65900-d574-4a30-ab84-cd913b7fa895%2Fkey-6.svg?1537295202475";
const armsUp = "https://cdn.glitch.com/c4e65900-d574-4a30-ab84-cd913b7fa895%2Farms-up-keys.svg?1537296861018";
const armsDown = "https://cdn.glitch.com/c4e65900-d574-4a30-ab84-cd913b7fa895%2Farms-down-keys.svg?1537296860927";
const bongoCat = "https://cdn.glitch.com/c4e65900-d574-4a30-ab84-cd913b7fa895%2Farms-up-keys.svg?1537296861018";
const keyboard = "https://cdn.glitch.com/c4e65900-d574-4a30-ab84-cd913b7fa895%2Fkeyboard-outline.svg?1537295201926";
const neutral = "https://cdn.glitch.com/c4e65900-d574-4a30-ab84-cd913b7fa895%2Fneutral.svg?1537295202313";

const keys = {
  a: key1,
  s: key2,
  d: key3,
  f: key4,
  j: key5,
  k: key6,
  space: armsDown,
  enter: keyboard,
};

const input = $('#file')[0];
var fileTypes = [
  'audio/mpeg3',
  'audio/mp3',
  'audio/x-m4a',
  'audio/wav'
]

function validFileType(file) {
  console.log(`file.type: ${file.type}`);
  for(var i = 0; i < fileTypes.length; i++) {
    if(file.type === fileTypes[i]) {
      return true;
    }
  }

  return false;
}

function showHelp(key){
  $('.help-text .keypress').css('visibility', 'initial');
  $('#key').html(key);
}

function toggleArms(){
  if($('#bongo-cat').hasClass('arms-up')){
    $('#bongo-cat').attr('src', armsDown);
    $('#bongo-cat').removeClass('arms-up');
  }else{
   $('#bongo-cat').addClass('arms-up');
   $('#bongo-cat').attr('src', armsUp);
  }
}

function moveKeyboard(i){
  // reset keyboard position
  $('#keyboard').css('left', "-30px");
  $('#keyboard').css('bottom', "-10px");
    
  // move to position
  setTimeout(function(){
    var left = parseInt($('#keyboard').css('left'));
    var bottom = parseInt($('#keyboard').css('bottom'));
    $('#keyboard').css('left', left+1);
    $('#keyboard').css('bottom', bottom+1);
    $('#keyboard').css('display', 'block');
    if(i==161){
      $('#bongo-cat').attr('src', armsUp);
    }
  }, 200);
}

function playKey(key){
  console.log(`playKey ${key}`);
  showHelp(key);
  if(key != "enter"){
    $('#bongo-cat').attr('src', keys[key]);
    setTimeout(function() {$('#bongo-cat').attr('src', armsUp)}, 100);
  }else{
    $('#bongo-cat').attr('src', neutral);
    $('#keyboard').css('display', 'none');
    for(var i=0; i<162; i++){
      moveKeyboard(i);
    }
  }
}

input.addEventListener('change', function(){
  var file = input.files[0];
  if(validFileType(file)){
    console.log('added an audio file');
    $('.audio-player').css('visibility', 'inherit');
    var audio = $('audio')[0];
    audio.src = URL.createObjectURL(file);
  }else{
    console.log('invalid file');
  }
});

$(window).keypress(function(evt){
  console.log('keyboard pressed ' + evt.which);
  const keyA = 97;
  const keyS = 115;
  const keyD = 100;
  const keyF = 102;
  const keyJ = 106;
  const keyK = 107;
  const keySpace = 32;
  const keyU = 117;
  const keyEnter = 13;
  
  const keypressed = evt.which;
  
  switch(keypressed){
    case keyA:
      playKey('a');
      break;
    case keyS:
      playKey('s');
      break;
    case keyD:
      playKey('d');
      break;
    case keyF:
      playKey('f');
      break;
    case keyJ:
      playKey('j');
      break;
    case keyK:
      playKey('k');
      break;
    case keySpace:
      playKey('space');
      break;
    case keyEnter:
      playKey('enter');
      break;
    default:
      $('#help-text').attr('display', 'none');
   }
  
  
});

$(document).ready(function(){
  console.log('ready');
   if($(window).width() < 500){
     console.log('showing small overview');
    $('div').not('#smallOverview').hide();
    $('#smallOverview').show();
  }
});