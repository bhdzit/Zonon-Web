

//var btnsearch= document.getElementById('btnsearch');

//btnsearch.addEventListener('click', e =>{

function buscar(){

  var search= document.getElementById('search').value;
  firebase.database().ref('/Cliente')
        .orderByChild('nombre')
        .startAt(search)
        .endAt(search+'\uf8ff')
        .on('value', function (snapshot) {
            document.getElementById('cliente').deleteTFoot();
                    snapshot.forEach(function(child) {
                    var writeCliente = child.val();

                    var client_key= child.key;
                    var table = document.getElementById("cliente");
                    var tb = table.createTFoot();
                    //Creea la celda de las Tabla
                    const tbrow=  tb.insertRow();
                    const tdnom= tbrow.insertCell();
                    const tdDirec= tbrow.insertCell();
                    const tdip = tbrow.insertCell();
                    const tdfecha_pago = tbrow.insertCell();
                    const btnpay=tbrow.insertCell();


                    var a='<p width="150"><div align="center">'+writeCliente.nombre+'</div></p>';
                    tdnom.innerHTML=a;

                    var a='<p width="250" ><div align="center">'+writeCliente.direccion+'</div></p>';
                    tdDirec.innerHTML=a;

                    var a='<p width="150"><div align="center">'+writeCliente.ip+'</div></p>';
                    tdip.innerHTML=a;

                    var a='<p width="150"> <div align="center">'+writeCliente.fecha_de_pago+'</div></p>';
                    tdfecha_pago.innerHTML=a;

                    btnpay.innerHTML='<div align="center"><i class="fas fa-money-bill"></i></div>';
                    btnpay.addEventListener('click', e=>{
                      cliente_PayDitels(writeCliente);
                    });

                    tdnom.addEventListener('click', e =>{
                      dtlcliente=child.val();
                     client_Ditels(writeCliente,client_key);
                     //console.log(client_key);
                    });

                });
                var key = snapshot.key,
                data = snapshot.val();
          });

}
function cliente_PayDitels(Cliente){
  var dia=new Date();
  const domicilio=document.getElementById("domicilio");
  domicilio.innerText="RECIBIMOS DE: "+Cliente.nombre+" CON DOMICILIO EN: "+Cliente.direccion;
  const paquete=document.getElementById("selectd_pkg");
  paquete.addEventListener('click', e=>{
    const prices_pkg=document.getElementById("prices_pkg");
    prices_pkg.innerHTML='<strong>$ '+paquete.options[paquete.selectedIndex].value+'</strong>';
    const total= document.getElementById("total");
    total.innerHTML="<strong>$"+paquete.options[paquete.selectedIndex].value+"</strong>";

  });
  const pay_date=document.getElementById("pay_date");
  pay_date.innerText=setFecha();
  const fecha_de_pago=document.getElementById("fecha_pago");
  fecha_de_pago.innerText=setFecha();
  var dia_regitro=document.getElementById("fecha_registro");
  dia_regitro.innerText=Cliente.fecha_contratacion;
  var divpopup=document.getElementById("pay_bg");
  divpopup.style.display="block";
  var select=document.getElementById("selectd_pkg");
  getPaquetes(select,Cliente.dia_corte);
  const genPDF=document.getElementById("pay");
  pay.addEventListener('click', e=>{
    setPago(Cliente);
    Cliente="";
  });
}
function client_Ditels(Cliente, key){
  //Obtener etiqueta de tabala
  var client_key=document.getElementById("client_key");
  client_key.innerText=key;
  var etiqueta=document.getElementById("name_clinet");
  etiqueta.value=Cliente.nombre;
  //Obtener etiqueta de tabala
  var etiqueta=document.getElementById("ip_client");
  etiqueta.value=Cliente.ip;
  //Obtener etiqueta de tabala
  var etiqueta=document.getElementById("tel");
  etiqueta.value=Cliente.telefono;
  //Obtener etiqueta de tabala
  var etiqueta=document.getElementById("dir_clinet");
  etiqueta.value=Cliente.direccion;
  //Obtener etiqueta de tabala
  var etiqueta=document.getElementById("dia_regitro");
  etiqueta.value=Cliente.fecha_contratacion;
//Fecha de corte
  const fecha_corte=document.getElementById("fecha_corte");
  fecha_corte.value=Cliente.dia_corte;


  const fecha_pago=document.getElementById("fecha_pago");
  fecha_pago.value=Cliente.fecha_de_pago;


  //Obtener etiqueta de tabala
  var etiqueta=document.getElementById("paquete");
  etiqueta.value=Cliente.paquete;
  const correo=document.getElementById("correo");
  correo.value=Cliente.correo;

  //Obtener etiqueta de tabala
  var btnsetPay=document.getElementById("pagos");
  btnsetPay.addEventListener('click', e=> {
    cliente_PayDitels(Cliente);
  });

  //Desplagar Ventana ermejente Popup
  var divpopup=document.getElementById("popup_bg");
  divpopup.style.display="block";
    key="";

}
function close_payDitels(){
  var divpopup=document.getElementById("pay_bg");
  divpopup.style.display="none";
}
function close_ClienteDitels(){
  var divpopup=document.getElementById("popup_bg");
  divpopup.style.display="none";

}
function setPago(Cliente){

  var fecha_pago=document.getElementById("fecha_pago").innerText;
  var prices_pkg=""+document.getElementById("prices_pkg").innerText;
  var fecha_registro=document.getElementById("fecha_registro").innerText;
  var paquete=document.getElementById("selectd_pkg").innerHTML;
  var sel = document.getElementById('selectd_pkg');
  var a=sel.options[sel.selectedIndex].text;
  var datos={
    "nombre":Cliente.nombre,
    "paquete":a,
    "direccion":Cliente.direccion,
    "costo":prices_pkg,
    "total":prices_pkg,
    "fecha_pago":fecha_pago
    };
  var d= new Date();

  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");

  var newPostKey = firebase.database().ref().push().key;
	firebase.database().ref('Pagos/'+meses[d.getMonth()]+'-'+d.getFullYear()+'/'+ newPostKey).set({
  nombre:Cliente.nombre,
  fecha_de_pago:d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear(),
	correo:Cliente.correo,
	paquete:a,
  ip:Cliente.ip,
  dia_corte:Cliente.dia_corte,
  tipo_pago:"Establecimiento"

}).then(function() {
            genPDF(datos);
            close_payDitels();
            console.log('dato almacenado correctamente');
        })
        .catch(function(error) {
            console.log('detectado un error', error);
        });


}
function datePayments(search){
  var table = document.getElementById("lista_pagos");
firebase.database().ref('/Pagos')
        .orderByChild('nombre')
        .startAt(search)
        .endAt(search+'\uf8ff')
        .on('value', function (snapshot) {
            document.getElementById('lista_pagos').deleteTFoot();
                    snapshot.forEach(function(child) {
                    var writeCliente = child.val();
                    console.log(search);

                    var tb = table.createTFoot();
                    //Creea la celda de las Tabla
                    const tbrow=  tb.insertRow();
                    const tdnom= tbrow.insertCell();
                    const tdDirec= tbrow.insertCell();
                    const tdip = tbrow.insertCell();
                    const tdfecha_pago = tbrow.insertCell();


                    var a='<p width="150"> <div align="center">'+writeCliente.nombre+'</div></p>';
                    tdnom.innerHTML=a;
                    var a='<p width="150"> <div align="center">'+writeCliente.ip+'</div></p>';
                    tdip.innerHTML=a;

                    var a='<p width="150"> <div align="center">'+writeCliente.fecha_de_pago+'</div></p>';
                    tdfecha_pago.innerHTML=a;

                });
                var tb = table.createTFoot();
                //Creea la celda de las Tabla
                const pagos=  tb.insertRow();
                //const pagos=tbrow.insertRow();
                  pagos.innerHTML='<tr><td>&nbsp;</td> <td><div align="right"><strong>TOTAL:</strong></div></td> <td>&nbsp;</td>  <td><div align="center"><strong></strong></div></td>                  </tr>'

                  var key = snapshot.key,
                data = snapshot.val();
          });

}
function setFecha(){
var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
var f=new Date();

var a =(diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());

return a;
}
function genPDF(datos) {

      var jason = JSON.stringify(datos);
      var xhr = new XMLHttpRequest();
      xhr.open('get', "genPDF.php?x="+jason, true);
      xhr.responseType = 'blob';
      xhr.onload = function(e) {
        if (this.status == 200) {
          var blob = new Blob([this.response], {type: 'application/pdf'});
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = "report.pdf";
          link.click();
        }
      };
      xhr.send();
}
function getPaquetes(select,dia_corte){
  var dia=new Date;
  var line="";
  firebase.database().ref('/Paquetes')
          .orderByChild('pago_op')
          .on('value', function (snapshot) {
                          snapshot.forEach(function(child) {
                          var writeCliente = child.val();
                          if(dia.getDate()>dia_corte){
                            var pago=writeCliente.pago_rt;
                          }
                          else{

                          pago=writeCliente.pago_op;
                          }

                      line +='<option value="'+pago+'">'+child.key+": $ "+pago+'</option>'
                      });
                      select.innerHTML=line;
          });
}
function saveChanges(){
  const client_key=document.getElementById("client_key").innerText;
  var eta_nombre=document.getElementById("name_clinet").value;
  //Obtener etiqueta de tabala
  var eta_ip=document.getElementById("ip_client").value;
  //Obtener etiqueta de tabala
  var eta_tel=document.getElementById("tel").value;
  //Obtener etiqueta de tabala
  var eta_dir=document.getElementById("dir_clinet").value;
  //Obtener etiqueta de tabala
  var eta_dia_r=document.getElementById("dia_regitro").value;
  //Obtener etiqueta de tabala


  //Fecha de corte
    const fecha_corte=document.getElementById("fecha_corte");
    var eta_fecha_corte=fecha_corte.value;
    const fecha_pago=document.getElementById("fecha_pago");
    var eta_fecha_pago=fecha_pago.value;
    const correo=document.getElementById("correo");
var eta_correo=correo.value;

  var eta_paquete=document.getElementById("paquete").value;


  var Cliente={
  nombre:eta_nombre,
  coordenadas: "1",
  correo:eta_correo,
  dia_corte:eta_fecha_corte,
  direccion:eta_dir,
  fecha_contratacion:eta_dia_r,
  fecha_de_pago:eta_fecha_pago ,
  ip:eta_ip,
  paquete: eta_paquete,
  telefono:eta_tel

  };
  //Obtener etiqueta de tabala
console.log(client_key);
  var updates={};
   updates['/Cliente/'+ client_key] = Cliente;

  return firebase.database().ref().update(updates);

}
