

(function() {
  //firebase.initializeApp(config);
  // Obtener elementos
	const btnlogout = document.getElementById('btnLogout');

	// Añadir Evento login
	btnlogout.addEventListener('click', e => {
  firebase.auth().signOut();
});

	firebase.auth().onAuthStateChanged( firebaseUser => {
  if(!firebaseUser) {
	window.location="index.html";
  console.log(firebaseUser);
    }
  });

} ());



/*


(function() {
  firebase.initializeApp(config);
  // Obtener elementos
	const btnlogout = document.getElementById('btnLogout');

	// Añadir Evento login
	btnlogout.addEventListener('click', e => {
    firebase.auth().signOut();

  	});

	firebase.auth().onAuthStateChanged( firebaseUser => {
    if(!firebaseUser) {
		window.location="http://127.0.0.1/zonaon/login.htm";
      console.log(firebaseUser);


    }
  });

} ());// JavaScript Document*/
