export  class Egresados {

  //Informacion Basica
  idEgresado:string = "";
  nombres:string = "";
  apellidos:string = "";
  tipoIdentificacion:string = "";
  identificacion:string = "";
  ciudadExpedicion:string = "";
  paisResidencia:string;
  ciudadResidencia:string;
  direccionResidencia:string;
  telefonoFijo:string = "";
  telefonoMovil:string = "";
  telefonoMovilAlterno:string = "";
  correoElectronico:string= "";
  correoElectronicoAlterno:string = "";

  //Informacion Academica
  idInformacionAcademica:string = "";
  idPrograma:string = "";
  libro:string = "";
  folio:string = "";
  acta:string = "";
  numeroDiploma:string = "";
  semestreGrado:string = "";
  formaGrado:string = "";
  tipoOpcionGrado:string = "";
  notaOpcionGrado:string = "";
  semestreFinalizoMaterias:string = "";

  //Informacion de control
  idInformacionControl:string ="";
  fechaEntregaCarnet:string ="";
  encuestaM0En:string ="";
  encuestaM1En:string ="";
  encuestaM5En:string ="";
  gradoAcademusoft:string ="";
  recibeInformacion:string ="";
  tipoInformacion:string ="";
  observacionCorreo:string ="";
  observacionesGenerales:string ="";

  constructor(){

  }

}
