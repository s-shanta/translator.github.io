//language recognition
var language = 'en';
// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyAZjaec5Qm-C4oVf8KBB52leJgeeoo5lAc",
authDomain: "patienttodoctor-63b2d.firebaseapp.com",
databaseURL: "https://patienttodoctor-63b2d.firebaseio.com",
projectId: "patienttodoctor-63b2d",
storageBucket: "patienttodoctor-63b2d.appspot.com",
messagingSenderId: "992653525810",
appId: "1:992653525810:web:9a60fdb102cc6a77fb8d2b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//Firebase DB reference
const db = firebase.database().ref('patient/' + '1');
//Firebase Insert
function fireBaseInsert(message) {
  console.log(message);
  db.set({
    idOfPatient: '1',
    message: message
  });
}
//Firebase Get
function fireBaseGet() {
  db.on('value', function(snapshot){
    document.getElementById("listeningoutput").textContent = snapshot.val().message;
    // myFunction();
  });
}
fireBaseGet();

//selecting google element language
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    includedLanguages: 'en,ja'
  }, 'google_translate_element');
}
//setting dafult toggle as english
setTimeout(function(){
  var select = document.querySelector('select.goog-te-combo');
  select.value    = "en"; 
  select.dispatchEvent(new Event('change'));
},500)

//toggle language select

document.getElementById('toggleButton').addEventListener('change',(e)=>{
  var select = document.querySelector('select.goog-te-combo');
  if(e.target.checked){
    console.log('ja');
    select.value = 'ja';
    language = 'ja';
    select.dispatchEvent(new Event('change'));
  }else{
    console.log('en');
    select.value = 'en';
    language = 'en';
    select.dispatchEvent(new Event('change'));
  }
})


//JS for listenning 
document.getElementById('speak').addEventListener('click', runSpeechRecognition);
function runSpeechRecognition() {
  // get output div reference
  var output = document.getElementById("speakingoutput");
  // get action element reference
  var action = document.getElementById("speak-action");
  // new speech recognition object
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();

  recognition.lang = language;

  // This runs when the speech recognition service starts
  recognition.onstart = function() {
    action.innerHTML = "<small>listening, please speak...</small>";
  };

  recognition.onspeechend = function() {
    action.innerHTML = "<small>stopped listening, hope you are done...</small>";
    recognition.stop();
    var listenAction = document.getElementById("listen-action");
    listenAction.innerHTML = "<small>done speaking, you may listen...</small>";
  }

  // This runs when the speech recognition service returns result
  recognition.onresult = function(event) {
    var transcript = event.results[0][0].transcript;
    output.innerHTML = "<b>Text:</b> " + transcript ;
    output.classList.remove("hide");
    fireBaseInsert(transcript);
  };
  // start recognition
  recognition.start();
}

/* JS for Listening */
document.getElementById('listen').addEventListener('click',myFunction);
function myFunction() {
  var listenAction = document.getElementById("listen-action");
  listenAction.innerHTML = "<small>listening...</small>";
  document.getElementById('listeningoutput').style.color= 'black';
  let msg = document.getElementById("listeningoutput").textContent;
  console.log(msg);

  let speech = new SpeechSynthesisUtterance();

  console.log(window.language);
  if(window.language ==='en'){
    speech.lang = 'en-US';
  }else{
    speech.lang = 'ja-JP';
  }

  speech.text = msg;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
  
  speech.onend = e => {
    listenAction.innerHTML = "<small>click the button and listen...</small>";
    var action = document.getElementById("speak-action");
    action.innerHTML = "<small>click the button and speak...</small>";
  };
}
