//language recognition
var language = '';
    
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
    document.getElementById("text-to-speech").textContent = snapshot.val().message;
    // myFunction();
  });
}
fireBaseGet();
/* JS for Speaking */

//selecting language for input and output
function selectLanguage(){
  var select = document.querySelector('select.goog-te-combo');
  if(select.value == 'ja'){
      select.dispatchEvent(new Event('change'));
      // console.log(4);
      language = 'ja';
    }
    else{
      select.dispatchEvent(new Event('change'));
      // console.log(5);
      language = 'en';
    }
}

//JS for listenning 
function runSpeechRecognition() {
  // get output div reference
  var output = document.getElementById("output");
  // get action element reference
  var action = document.getElementById("action");
  // new speech recognition object
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();

  selectLanguage();
  recognition.lang = language;

  // This runs when the speech recognition service starts
  recognition.onstart = function() {
    action.innerHTML = "<small>listening, please speak...</small>";
  };

  recognition.onspeechend = function() {
    action.innerHTML = "<small>stopped listening, hope you are done...</small>";
    recognition.stop();
  }

  // This runs when the speech recognition service returns result
  recognition.onresult = function(event) {
    var transcript = event.results[0][0].transcript;
    var confidence = event.results[0][0].confidence;
    output.innerHTML = "<b>Text:</b> " + transcript + "<br/> <b>Confidence:</b> " + confidence * 100 + "%";
    output.classList.remove("hide");
    fireBaseInsert(transcript);
  };
  // start recognition
  recognition.start();
}

/* JS for Listening */
document.getElementById('buttonOutput').addEventListener('click',myFunction);
function myFunction() {
  let msg = document.getElementById("text-to-speech").textContent;
  console.log(msg);

  let speech = new SpeechSynthesisUtterance();
  selectLanguage();
  console.log(window.language);
  // speech.lang = 'en-US';
  if(window.language ==='en'){
    // console.log(5);
    speech.lang = 'en-US';
  }else{
    speech.lang = 'ja';
    // console.log(4);
  }

  speech.text = msg;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}

//selecting language
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    includedLanguages: 'en,ja'
  }, 'google_translate_element');
}