// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB0bEUJwBZe4_9DR7Uwf9uIABhvZ1LalPI",
    authDomain: "arif-nazrul.firebaseapp.com",
    databaseURL: "https://arif-nazrul.firebaseio.com",
    projectId: "arif-nazrul",
    storageBucket: "arif-nazrul.appspot.com",
    messagingSenderId: "567665611262"
  };
  firebase.initializeApp(config);



$(document).ready(function() {
  AOS.init( {
    // uncomment below for on-scroll animations to played only once
    // once: true  
  }); // initialize animate on scroll library
});

// Smooth scroll for links with hashes
$('a.smooth-scroll')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});

var messageRef = firebase.database().ref('messages');

document.getElementById('contactForm').addEventListener('submit', submitForm);
function submitForm(e){
e.preventDefault();

var name= getInputVal("name");
var subject= getInputVal("subject");
var email= getInputVal("email");
var message= getInputVal("message");

saveMessage(name,subject,email,message);

document.querySelector('.alert').style.display = 'block';

setTimeout(function(){
  document.querySelector('.alert').style.display = 'none';
  },2000);

document.getElementById('contactForm').reset();
} 

function saveMessage(name, subject, email, message){
  var newMessageRef = messageRef.push();

  newMessageRef.set({
    name:name,
    subject:subject,
    email:email,
    message:message
  });
}

function getInputVal(id){
  return document.getElementById(id).value;
}