export  class Egresados {

  //Informacion Basica
  idEgresado:number;
  nombres:string;
  apellidos:string;
  tipoIdentificacion:number;
  identificacion:string;
  ciudadExpedicion:string;
  paisResidencia:string;
  ciudadResidencia:string;
  direccionResidencia:string;
  telefonoFijo:number;
  telefonoMovil:number;
  telefonoMovilAlterno:number;
  correoElectronico:string;
  correoElectronicoAlterno:string;

  //Informacion Academica
  idInformacionAcademica:number;
  idPrograma:number;
  libro:string;
  folio:string;
  acta:string;
  numeroDiploma:number;
  semestreGrado:string;
  formaGrado:string;
  tipoOpcionGrado:string;
  notaOpcionGrado:string;
  semestreFinalizoMaterias:string;

  constructor(){
    /*this.idEgresado = idEgresado;
    this.nombres = nombre;
    this.apellidos = apellidos;
    this.tipoDoc = tipoDoc;
    this.numeroDoc = numeroDoc;
    this.telefono = telefono;*/
  }

}
