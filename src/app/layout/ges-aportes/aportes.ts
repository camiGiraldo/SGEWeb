export  class Aporte {

  idAporteInvestigacion:string = "";//
  idTipoAporte:string;//
  fechaRealizacion:string//
  fechaFinalizacion:string;//
  grupoBeneficiario:string;//
  subGrupoBeneficiario:string ="";//
  nombreProyecto:string; //
  descripcionProyecto:string =""; //
  personaACargo:string ="";//
  correoElectronico:string ="";
  telefono:string ="";
  adjunto:string ="";

}

export class AporteEgresado{

  idEgresadoAporte: string = "";
	idAporteInvestigacion: string;
  idEgresado:string;
	egresado: any;
  nombreEgresado:string;
  apellidosEgresado:string;
	participacion: string;
	urlExterna: string;
	soporte: string;

}
