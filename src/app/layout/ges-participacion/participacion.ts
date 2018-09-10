export  class Participacion {

  idParticipacionDemocratica:string = "";
  idFormaParticipacion:string;
  organoGremial:string
  fechaInscripcion:string;
  fechaEleccion:string;
  vigencia:string ="";
  fechaLimite:string;
  dependenciaSupervisa:string ="";
  personaACargo:string ="";
  correoElectronico:string ="";
  telefono:string ="";
  enlaceVotaciones:string ="";

}

export class ParticipacionEgresado{

  idParticipacionEgresado: string = "";
	idParticipacionDemocratica: string;
  idEgresado:string;
	egresado: any;
  nombreEgresado:string;
  apellidosEgresado:string;
	inscrito: string;
	elegido: string;
	socioFundador: string;
  socioAdherente: string;
  beneficiario: string;

}
