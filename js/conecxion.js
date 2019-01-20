
(function() {



  // Obtener elementos
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  //const btnLogout = document.getElementById('btnLogout');
	// Añadir Evento login
  btnLogin.addEventListener('click', e => {
    //Obtener email y pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);

    promise.catch(e => document.getElementById("p1").innerHTML = "Verifica Correo o contraseña");
  });

	/*btnLogout.addEventListener('click',e =>){
	 firebase.auth().signOut();

  });*/

  // Añadir evento signup

  // Añadir un listener en tiempo real
   firebase.auth().onAuthStateChanged( firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);

    } else {
      console.log('no logueado');

    }
  });
} ());
