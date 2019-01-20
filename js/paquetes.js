function getPaquetes(){
  var ref= firebase.database().ref('/Paquetes/')
          .orderByKey();
          ref.on('value', function (snapshot) {

                      snapshot.forEach(function(child) {
                        var key=child.key;
                          var paquete_Value = child.val();
                        var table = document.getElementById("lista_paquetes");
                        var tb = table.createTFoot();
                        //Creea la celda de las Tabla
                        const tbrow=  tb.insertRow();
                        const tbNom= tbrow.insertCell();
                        const tbCosto= tbrow.insertCell();
                        const tbVelocidad = tbrow.insertCell();
                        const edit_btn=tbrow.insertCell();
                        var a='<div  align="center" ><input type="text" value="'+key+'" disabled ></div>';
                        tbNom.innerHTML=a;
                        var a='<div align="center" ><input type="text" value="$'+paquete_Value.pago_op+'" disabled></div>';
                        tbCosto.innerHTML=a;
                        var a='<div align="center" ><input type="text" value="'+paquete_Value.velocidad+'" disabled></div>';
                        tbVelocidad.innerHTML=a;
                        //tbVelocidad.
                        var a='<div align="center" disabled><i class="fas fa-edit"></i></div>'
                        edit_btn.innerHTML=a;
                        edit_btn.addEventListener('click', e=>{
                          editPkg(tbrow,key);
                        });

                  });
            });



}

function editPkg(etic, key){
  //const nom=etic.getElementById("id");


  const nom=etic.getElementsByTagName('input');
  nom[0].disabled=false;
  nom[1].disabled=false;
  nom[2].disabled=false;
  const i=3;
  etic.insertCell();

  const btn_cancelar=etic.getElementsByTagName('td')[4];
  document.getElementById("cancelar").hidden=false;

  const txt_guardar=document.getElementById("Guardar");
  txt_guardar.style.pointerEvents = "none";
  const btn_guardar=etic.getElementsByTagName("td")[3];
  btn_guardar.innerHTML='<div align="center"><i class="fas fa-save"></i></div>';
  btn_cancelar.innerHTML='<div align="center"><i class="fas fa-ban"></i></div>';
  btn_cancelar.addEventListener('click', e=>{
    etic.deleteCell(4);
      document.getElementById("cancelar").hidden=true;
      btn_guardar.innerHTML='<div align="center"><i class="fas fa-edit"></i></div>';
  });
    btn_cancelar.removeEventListener('click', close_editPgk());
  //console.log("Editar"+nom[0].value);

/*
  const costo=document.getElementById("costo");
  costo.value=Paquete.pago_op;

  const velocidad=document.getElementById("velocidad");
  velocidad.value=Paquete.velocidad;

  var divpopup=document.getElementById("popup_bg");
  divpopup.style.display="block";*/
}

function close_editPgk(){
  var divpopup=document.getElementById("popup_bg");
  divpopup.style.display="none";
  }
