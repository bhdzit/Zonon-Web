//const botton=document.getElementById("push");

function setCliente(){
	//
	const txtnombre=document.getElementById("nombre").value;
	const txtapellidos=document.getElementById("apellidos").value;
	const txtdieccion=document.getElementById("direccion").value;
	const txtcorreo=document.getElementById('Correo').value;
	const txttelefono=document.getElementById("telefono").value;
	const txtpaquete=document.getElementById("paquete").value;
	const txtfecha_pago=document.getElementById('fecha_pago').value;
	const txtfecha_corte=document.getElementById('fecha_corte').value;
	const txtfecha_registro=document.getElementById("datepicker").value;
	const txtip=document.getElementById("ip").value;
	const div=document.getElementById('registro_completo');


		var newPostKey = firebase.database().ref().push().key;
			if(txtnombre==""){
				alert("Nombre es Obligatorio");
				return;
			}
			if(txtapellidos==""){
				alert("Apellidos es Obligatorio");
				return;
			}
			if(txtcorreo==""){
				alert("Correo es Obligatorio");
				return;
			}
			if(txttelefono==""){
				alert("Telefono es Obligatorio");
				return;
			}
			if(txtfecha_registro==""){
				alert("Fecha de registro es Obligatorio");
				return;
			}
			if(txtdieccion==""){
				alert("DIRECCION es Obligatorio");
				return;
			}
			if(txtip==""){
				alert("IP es Obligatorio");
				return;
			}
		firebase.database().ref('Cliente/' + newPostKey).set({

    /*  coordenadas :"",
      correo : txtcorreo,
      dia_corte : txtfecha_corte,
      direccion : "Miguel Hidalgo #28 Xochitlan",
      fecha_contratacion : "17-08-2017",
      fecha_de_pago : "1",
      ip : "192.168.1.200",
      nombre : "Bryan MORAN",
      paquete : "Avanzado"
*/

	 	nombre:txtnombre+" "+txtapellidos,
		coordenadas: "1",
		correo:txtcorreo,
		dia_corte:txtfecha_corte,
		direccion: txtdieccion,
		fecha_contratacion: txtfecha_registro,
		fecha_de_pago: txtfecha_pago,
		ip: txtip,
		paquete: txtpaquete,
		telefono:txttelefono

	}).then(function(){
		div.style.display="inline-block";
		resset();

	}).catch(function(err){
			div.style.display="inline-block"
		div.innerHTML=("<p>Error al agregar cliente"+err+"</p>");
		div.style.background="#f00";

	});

	}
	function resset(){
	document.getElementById("nombre").value="";
	document.getElementById("apellidos").value="";
	document.getElementById("direccion").value="";
	document.getElementById('Correo').value="";
	document.getElementById("telefono").value="";
	document.getElementById("paquete").value="";
	document.getElementById('fecha_pago').value="";
	document.getElementById('fecha_corte').value="";
	document.getElementById("datepicker").value="";
	document.getElementById("ip").value="";


	}
