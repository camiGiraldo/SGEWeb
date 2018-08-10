import { AfterViewInit, Component, NgZone, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import {
	Validators,
	FormBuilder
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CategoriasEventosService } from '../../_services/categoriasEventosService';
import * as $ from 'jquery';
import { environment } from '../../../environments/environment';


@Component({
	selector: 'app-categoria-eventos',
	templateUrl: './categoria-eventos.component.html',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['./categoria-eventos.component.scss'],
	animations: [routerTransition()]
})

export class CategoriaEventosComponent implements OnInit, AfterViewInit {

	@ViewChild(DataTableDirective) dtElement: DataTableDirective;
	@ViewChild('mdlNotification') public modalNotification: NgbModal;

	//vaariables para la tabla
	dtOptions: any;
	dtTrigger: Subject<any> = new Subject();
	cellSelect: any;
	//------------------------

	modalRef: any;
	public url: string;


	message = '';
	messageValidation = '';
	closeResult: string;

	//MAPEO DE LOS ATRIBUTOS DEL FORMULARIO A CREAR
	idEdit: string = '';
	nameCat: string = '';
	estadoCat: string = '';

	constructor(private zone: NgZone, private modalService: NgbModal, private catService: CategoriasEventosService) {

		this.url = environment.urlServices;
		this.idEdit = '';
		this.url = environment.urlServices;
		this.cellSelect = {
			id: ''
		}
		this.message = 'No se ha seleccionado una fila';


	}

	ngAfterViewInit(): void {
		this.dtTrigger.next();

	}

	someClickHandler(info: any): void {

		if (this.cellSelect.idCategoriaEvento !== info.idCategoriaEvento) {
			this.cellSelect = {
				id: info.idCategoriaEvento
			}
			this.message = info.nombre;
			this.idEdit = info.idCategoriaEvento;
			console.log("info.idCategoriaEvento",info.idCategoriaEvento);
		}
		else {
			this.cellSelect = {
				id: ''
			}
			this.message = 'no se ha seleccionado una fila';
			this.idEdit = '';
		}


	}


	ngOnInit(): void {


		this.dtOptions = {
			ajax: this.url + 'getCategoriasEvento',
			columns: [{
				title: 'ID',
				data: 'idCategoriaEvento',
				visible: false
			}, {
				title: 'Nombre',
				data: 'nombre'
			}, {
				title: 'Estado',
				data: function (row, type, set) {
					return (row.activo=="1")?"Activo":"Inactivo";
				}
			}],
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
				$('td', row).unbind('click');
				$('td', row).bind('click', () => {
					self.someClickHandler(data);
				});
				return row;
			},
			select: {
				style: 'single'
			},
			"language": {
				"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
			}
		};
	}

	open(content, action: string) {
		this.modalRef = this.modalService.open(content);
		if (action == 'edit') {

			console.log("this.idEdit",this.idEdit);
			if (this.idEdit != '') {
				let callBack = this.catService.getCategoriaEventoById(this.idEdit);
				callBack.subscribe(res => {
					let data = res.json();

					if (data.status && data.status === 'OK') {
						var categoria = data.data;
						console.log("categoria.idCategoriaEvento",categoria.idCategoriaEvento);
						this.idEdit = categoria.idCategoriaEvento;
						this.nameCat = categoria.nombre;
						this.estadoCat = categoria.activo

					}
				});
			}
			else {
				this.message = "Por favor seleccionar una fila para editar";
				this.modalRef.close();
				this.openNotification(this.message, 'error');
			}
		}


		this.modalRef.result.then((result) => {
			this.cleanForm();
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.cleanForm();
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});

	}

	cleanForm() {
		//this.idEdit = "";
		this.nameCat = "";
		this.estadoCat = "";

	}


	//SECCION DE  NOTIFICACIONES
	//AUTOR: CAMILO GIRALDO 2018
	//variables para los mensajes de notificacion
	titleNotification: string;
	messageNotification: string;
	iconNotification: string;
	colorAlert: string;
	//-------------------------------------------
	//METODO PARA ABRIR EL MODAL DE LA NOTIFICACION
	openNotification(messageComplement: string, type: string) {


		let titleNot: string;
		let firstMessage: string;
		let classBox: string;
		let classIcon;
		let colorIcon;

		switch (type) {
			case 'succes':
				titleNot = "Confirmación";
				firstMessage = "Registro exitoso.";
				classIcon = "fa fa-check-square-o";
				colorIcon = "green";
				classBox = "succes-msg";
				break;
			case 'info':
				titleNot = "Información";
				firstMessage = "";
				classIcon = "fa fa-exclamation-triangle";
				colorIcon = "#b0b01a";
				classBox = "info-msg";
				break;
			case 'error':
				titleNot = "Error";
				firstMessage = "Opps! ";
				classIcon = "fa fa-times";
				colorIcon = "red";
				classBox = "error-msg";
				break;
		}

		this.titleNotification = titleNot;
		this.messageNotification = firstMessage + messageComplement;
		this.iconNotification = classIcon;
		this.colorAlert = colorIcon;
		this.modalService.open(this.modalNotification, { windowClass: classBox });

	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			this.cleanForm();
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			this.cleanForm();
			return 'by clicking on a backdrop';
		} else {
			this.cleanForm();
			return `with: ${reason}`;
		}
	}

	saveForm() {

		if (this.nameCat == '' || this.estadoCat == '') {
		//if (this.nameCat == '' ) {
			this.openNotification("Todos los campos son obligatorios", "error");
		} else {

			let data = {
				idCategoriaEvento: this.idEdit,
				nombre: this.nameCat,
				activo: this.estadoCat,
			};
			console.log("data send", data);
			let callBack = this.catService.saveCategoriaEvento(data);
			callBack.subscribe(res => {
				let data = res.json();

				let status = data.status;

				if (status == 'OK') {

					this.modalRef.close();
					this.openNotification("", "succes");
					this.message = 'No se ha seleccionado una fila';
				}
				else {
					this.messageValidation = 'Ocurrio un error al guardar el registro';

				}
			})
			this.rerenderTable();
		}
	}
	
	rerenderTable(): void {
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			// Destroy the table first
			dtInstance.destroy();
			this.idEdit = "";
			// Call the dtTrigger to rerender again
			this.dtTrigger.next();
		});
	}

}
