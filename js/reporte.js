function seeReportes(){
    console.log("asdadada");
      firebase.database().ref('/Tikets')
          .orderByChild('estado_reporte')
          .equalTo("s/f")
          .on('value', function (snapshot) {
              document.getElementById('reportes').deleteTFoot();
                      snapshot.forEach(function(child) {
                      var writeCliente = child.val();
                      var table = document.getElementById("reportes");
                      var tb = table.createTFoot();

                      //Creea la celda de las Tabla
                      const tbrow=  tb.insertRow();
                      const tdnom= tbrow.insertCell();
                      const tbFecha_Didponible= tbrow.insertCell();
                      const tbHora_Didponible = tbrow.insertCell();
                      const tbMsj= tbrow.insertCell();
                      const btnpay=tbrow.insertCell();

                      var a='<p width="150"><div align="center">'+writeCliente.User+'</div></p>';
                      tdnom.innerHTML=a;

                      var a='<p width="250" ><div align="center">'+writeCliente.date_start+" / "+writeCliente.date_end+'</div></p>';
                      tbFecha_Didponible.innerHTML=a;

                      var a='<p width="150"><div align="center">'+writeCliente.hora_star+" / "+writeCliente.hora_end+'</div></p>';
                      tbHora_Didponible.innerHTML=a;

                      var a='<p width="150"> <div align="center">'+writeCliente.msj+'</div></p>';
                      tbMsj.innerHTML=a;

                      btnpay.innerHTML='<div align="center"><i class="fas fa-clipboard-check"></i></div>';
                      btnpay.addEventListener('click', e=>{
                        changeEstate(writeCliente,child.key);
                      });

                      tbMsj.addEventListener('click', e =>{
                      setPop();
                      });

                  });
                  var key = snapshot.key,
                  data = snapshot.val();
            });

  }
function changeEstate(Cliente,key){
  Cliente.estado_reporte="finalizado";
  var updates={};
   updates['/Tikets/'+ key] = Cliente;

  return firebase.database().ref().update(updates);

}
function setPop(){
  var divpopup=document.getElementById("popup_bg_report");
  divpopup.style.display="block";
}
function close_payDitels(){
  var divpopup=document.getElementById("popup_bg_report");
  divpopup.style.display="none";
}
