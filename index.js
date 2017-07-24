var studentDB = firebase.database().ref('students');
var provider = new firebase.auth.GithubAuthProvider();
var email = '';
var emails = [];
var counter = 2;
var day = new Date().getDay();
console.log('hi');




firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    var token = result.credential.accessToken;
    // ...
  } else {
    firebase.auth().signInWithRedirect(provider);
  }
  // The signed-in user info.
  var user = result.user;
  email = user.email;
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
if (day === 6 || day === 5) {
  studentDB.remove();
}
$('form').submit(function(ev) {
  ev.preventDefault();
  var name = $(this).children('.name').val();
  if (! name.length) alert('please enter a name');
  else if (timeObj[this.id][$(this).children('.time').val()].length < 2 && emails.indexOf(email) === -1){
    studentDB.push({name:$(this).children('.name').val(), time: $(this).children('.time').val(), day: this.id, email:email}).then(function() {
      // appt made
    });
  } else {
    if (emails.indexOf(email) !== -1) alert('You can only book one slot per week');
    else alert("Booked Up, please choose another time, or day");
  }
});
var timeObj = {
  mon:{
    '3:00': [],
    '3:15': [],
    '3:30': [],
    '3:45': []
  }, tues:{
    '3:00': [],
    '3:15': [],
    '3:30': [],
    '3:45': []
  }, wed:{
    '3:00': [],
    '3:15': [],
    '3:30': [],
    '3:45': []
  }, thurs:{
    '3:00': [],
    '3:15': [],
    '3:30': [],
    '3:45': []
  }, fri:{
    '3:00': [],
    '3:15': [],
    '3:30': [],
    '3:45': []
  }};
studentDB.on('child_added', function(snap) {
  var currObj = snap.val();
  emails.push(currObj.email);
  if (timeObj[currObj.day][currObj.time].length < 2) {
    timeObj[currObj.day][currObj.time].push(currObj.name);
  }
  var selector = '#' + currObj.day + currObj.time.replace(/\:/, '\\3a ');
  $(selector).append('<li>' + currObj.name + '</li>');

})
