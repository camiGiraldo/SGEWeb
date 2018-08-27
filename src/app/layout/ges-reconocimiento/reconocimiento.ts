export  class Reconocimiento {

  idReconocimiento:string = "";
  idTipoReconocimiento:string;
  adjunto:string;
  fechaVinculacion:string
  lugarRealizacion:string;
  beneficiario:string ="";
  descripcion:string;
  fechaCreacion:string ="";

}

export class ReconocimeintoEgresado{

  idEgresadoReconocimiento: string;
	idReconocimiento: string;
	idEgresado: string;
  nombreEgresado:string;
  apellidosEgresado:string;
	distinguido: string;
	vinculadoLaboralmente: string;
	logroPublicado: string;
	urlExterna: string;
	soporte: string;

}
