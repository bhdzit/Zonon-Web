	var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
	var d= new Date();
	datePayments(d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear());


	function datePayments(date){
		var divcion=date.split("-");
		//console.log(meses[divcion[1]-1]);
		var search=date;
		var ref= firebase.database().ref('/Pagos/'+meses[divcion[1]-1]+'-'+divcion[2])
		        .orderByChild('fecha_de_pago')
		        .startAt(search)
		        .endAt(search+'\uf8ff');
		        ref.on('value', function (snapshot) {
		            document.getElementById('lista_pagos').deleteTFoot();
		                    snapshot.forEach(function(child) {
		                    var writeCliente = child.val();
		                   // console.log(search);
		                    var table = document.getElementById("lista_pagos");
		                    var tb = table.createTFoot();
		                    //Creea la celda de las Tabla
		                    const tbrow=  tb.insertRow();
		                    const tdnom= tbrow.insertCell();
		                    const tdDirec= tbrow.insertCell();
		                    const tdfecha_pago = tbrow.insertCell();
		                    const tdfecha_corte = tbrow.insertCell();
												const tbtipo_pago = tbrow.insertCell();
		                    var a=writeCliente.nombre;
		                    tdnom.innerHTML=a;

		                    var a='<p width="250"><div align="center">'+writeCliente.ip+'</div></p>';
		                    tdDirec.innerHTML=a;

		                    var a=writeCliente.paquete;
		                    tdfecha_pago.innerHTML=a;
												var a='<p width="150"> <div align="center">'+writeCliente.dia_corte+'</div></p>';
		                    tdfecha_corte.innerHTML=a;
												if(writeCliente.tipo_pago==="Transferencia"){
												var a = '<p width="150"> <div align="center">'+writeCliente.tipo_pago+'</div></p>';
												tbtipo_pago.innerHTML=a;
												tbtipo_pago.addEventListener('click', e =>{
																var pago_img=document.getElementById("pago_img");
																var sel = document.getElementById('validar_pago_pkg');
																getPaquetes(sel,writeCliente.dia_corte);
																pago_img.innerHTML='<img src="'+writeCliente.url_pago+'" />'
	                      				const btn_validar_pago=document.getElementById("pagos");
																			btn_validar_pago.addEventListener('click', e =>{
																			validarPago(writeCliente,child.key);
																		});
																				setPop();
	                      	});
												}
												else{
													var a = '<p width="150"> <div align="center">'+writeCliente.tipo_pago+'</div></p>';
													tbtipo_pago.innerHTML=a;

												}
		                });
		                var key = snapshot.key,
		                data = snapshot.val();
		          });

		}
	function setFiltro(){
		var x = document.getElementById("filtro");
     var i = x.selectedIndex;
		 if(x.options[i].value==="dia"||x.options[i].value==="corte"){
			 if(x.options[i].value==="dia")	datePayments(d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear());
			 		else {
						Corte();
			 				}
			}
		 else{
				 var search=x.options[i].value;
			  firebase.database().ref('/Pagos/'+meses[d.getMonth()]+'-'+d.getFullYear())
							.orderByChild('paquete')
							.startAt(search)
	 		        .endAt(search+'\uf8ff')
							.on('value', function (snapshot) {
	 		            				document.getElementById('lista_pagos').deleteTFoot();
	 		                    snapshot.forEach(function(child) {
        									var writeCliente = child.val();
													var dia=d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear();

													if(writeCliente.fecha_de_pago===dia){
													var table = document.getElementById("lista_pagos");
	 		                    var tb = table.createTFoot();
	 		                    //Creea la celda de las Tabla
	 		                    const tbrow=  tb.insertRow();
	 		                    const tdnom= tbrow.insertCell();
	 		                    const tdDirec= tbrow.insertCell();
	 		                    const tdfecha_pago = tbrow.insertCell();
	 		                    const tdfecha_corte = tbrow.insertCell();

	 		                    var a='<p width="150"><div align="center">'+writeCliente.nombre+'</div></p>';
	 		                    tdnom.innerHTML=a;

	 		                    var a='<p width="250"><div align="center">'+writeCliente.ip+'</div></p>';
	 		                    tdDirec.innerHTML=a;

	 		                    var a='<pwidth="150"> <div align="center">'+writeCliente.fecha_de_pago+'</div></p>';
	 		                    tdfecha_pago.innerHTML=a;

													var a='<pwidth="150"> <div align="center">'+writeCliente.dia_corte+'</div></p>';
	 		                    tdfecha_corte.innerHTML=a;
												}
	 		                });

	 		          });

		 }

		}
	function Corte() {

			var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
			var d= new Date();

			firebase.database().ref('/Cliente')
						 .orderByChild('nombre')
						 .on('value', function (snapshot) {
								 				 document.getElementById('lista_pagos').deleteTFoot();
												 snapshot.forEach(function(child) {
												 var writeCliente = child.val();
												 	verificarPagoDeMes(writeCliente);

										 });

							 });

		}
	function verificarPagoDeMes(writeCliente){
		var i=0;

		firebase.database().ref('/Pagos/'+meses[d.getMonth()]+'-'+d.getFullYear())
 	 			.orderByChild('nombre')
 	 			.equalTo(writeCliente.nombre)
 	 			.on('value', function(snap){
						  snap.forEach(function(child) {
						//	console.log(child.key);
							i++;
				});
				//	console.log(d.getDate());
					if(i===0&&writeCliente.dia_corte<=d.getDate()+1&&writeCliente.fecha_de_pago<=d.getDate()+1){


					var dia=d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear();

					var table = document.getElementById("lista_pagos");
					var tb = table.createTFoot();
					//Creea la celda de las Tabla
					const tbrow=  tb.insertRow();
					const tdnom= tbrow.insertCell();
					const tdDirec= tbrow.insertCell();
					const tdfecha_pago = tbrow.insertCell();
					const tdfecha_corte = tbrow.insertCell();

					var a='<p width="150"><div align="center">'+writeCliente.nombre+'</div></p>';
					tdnom.innerHTML=a;

					var a='<p width="250"><div align="center">'+writeCliente.ip+'</div></p>';
					tdDirec.innerHTML=a;

					var a='<pwidth="150"> <div align="center">'+writeCliente.fecha_de_pago+'</div></p>';
					tdfecha_pago.innerHTML=a;

					var a='<pwidth="150"> <div align="center">'+writeCliente.dia_corte+'</div></p>';
					tdfecha_corte.innerHTML=a;
					}

 		 });

	}
	function setPop(){
	  var divpopup=document.getElementById("popup_bg_report");
	  divpopup.style.display="block";
	}
	function close_payDitels(){

	  var divpopup=document.getElementById("popup_bg_report");
	  divpopup.style.display="none";
	}
	function validarPago(pago,key){
		var sel = document.getElementById('validar_pago_pkg');
		var a=sel.options[sel.selectedIndex].text;
		pago.paquete=a;
	  var updates={};
	   updates['/Pagos/'+meses[d.getMonth()]+'-'+d.getFullYear()+'/'+ key] = pago;

	  return firebase.database().ref().update(updates);

		console.log(key);
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
	function onChangeDate(){
		const dia= document.getElementById("datepicker");
		console.log(dia.value);
		datePayments(String(dia.value));
	}
	function imprimirPagos(){
		const tabla=document.getElementById("lista_pagos");
		//			for (var i = 1; i < tableReg.rows.length; i++)
		var total=0;
		var pagos_realisados='';
		const esta ="Establecimiento"+"\n";
			for(var i=2;i<tabla.rows.length;i++){
					var cellsOfRow = tabla.rows[i].getElementsByTagName('td');
					var tipos_pagos = cellsOfRow[4].innerText;
					var comp= tipos_pagos.localeCompare(esta);
					if(tipos_pagos==esta){
						var res = cellsOfRow[2].innerText.split("$ ");
						var cliente=cellsOfRow[0].innerText;
						var pkg_prices=res[1];

//						console.log(cellsOfRow[0].innerText+res[1]+tipos_pagos);
							pagos_realisados+='<tr><td colspan="2" class="tr_class"> '+cliente+'</td>';
							pagos_realisados+='<td class="tr_class">$ '+pkg_prices+'</td></tr>';
							var integer = parseInt(pkg_prices, 10);
							total+=integer;
								}
						}
				console.log(total);
				genPDF(pagos_realisados,total);
	}
	function genPDF(datos,total) {
	      var xhr = new XMLHttpRequest();
	      xhr.open('get', "report_pays.php?x="+datos+"&pago="+total, true);
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
