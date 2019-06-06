// Novo Cliente / Editar Cliente

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomersService } from '../services/customers.service';
import { VehiclesService } from '../services/vehicles.service';
import { Client } from '../models/client.model'
import { ClientFormValidation } from '../models/client-form-validation.model'

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {
	client: Client; // dados do cliente
	formValidation: ClientFormValidation; // validação do formulário
	id: string; // ID do cliente
	clientForm: any; // dados do formulário
	vehicleBrands: any; // marcas de veículos
	vehicleModels: any; // modelos de marca de veículo
	selectedBrand: any; // marca selecionada
	brandsPromise: any; // promisse do carregamento das marcas de veículos
	title: string; // título da página

	constructor(
		private formBuilder: FormBuilder,
		private customersService: CustomersService,
		private router: Router,
		private route: ActivatedRoute,
		private vehiclesService: VehiclesService
	) {
		this.client = new Client();

		this.clientForm = this.formBuilder.group({
			name: '',
			cpf: '',
			phone: '',
			birthday: '',
			address: '',
			vehicleBrand: '',
			vehicleModel: ''
		});

		this.clientForm.controls.vehicleBrand.disable();
		this.clientForm.controls.vehicleModel.disable();
	}

	ngOnInit() {
		let id = this.route.snapshot.params.id;
		this.formValidation = new ClientFormValidation();
		this.title = "Novo Cliente";

		if(id) {
			this.title = "Editar Cliente";
			document.title = this.title;
			this.id = id;
			this.client = this.customersService.getCustomerByID(this.id);

			if(this.client) {
				this.buildCustomerForm(this.client);
			} else {
				this.router.navigate(['']);
			}
		} else {
			document.title = this.title;
		}

		this.brandsPromise = new Promise(resolve => {
			this.vehiclesService.getBrands().then((resp: any) => {
				this.vehicleBrands = resp;

				if(this.id) {
					this.onBrandChange(this.client.vehicleBrand);
				}
				
				this.clientForm.controls.vehicleBrand.enable();
				resolve();
			})
		})
	}

	onSubmit(clientData: any) {
		// Ao clicar em Salvar
		if(!this.checkForm(clientData)){
			return;
		}

		if(this.id) {
			clientData.id = this.id;
			this.customersService.edit(clientData);
		} else {
			this.customersService.add(clientData);
		}

		this.router.navigate(['']);
		this.client = new Client();
		this.clientForm.reset();
	}

	onBrandChange(code: any) {
		// Ao selecionar marca do veículo
		if(code) {
			this.clientForm.controls.vehicleModel.setValue(null);
			this.clientForm.controls.vehicleModel.disable();

			this.brandsPromise.then(() => {
				this.selectedBrand = this.vehicleBrands.find(
					(brand: any) => brand.codigo == code
				);

				this.vehiclesService.getBrandModels(code).then((resp: any) => {
					this.vehicleModels = resp;
					this.clientForm.controls.vehicleModel.setValue(this.client.vehicleModel);
					this.clientForm.controls.vehicleModel.enable();
				});
			});
		}
	}

	buildCustomerForm(client: Client) {
		// Preenche o formulário com dados do cliente
		this.clientForm.controls.name.setValue(client.name);
		this.clientForm.controls.cpf.setValue(client.cpf);
		this.clientForm.controls.phone.setValue(client.phone);
		this.clientForm.controls.birthday.setValue(client.birthday);
		this.clientForm.controls.address.setValue(client.address);
		this.clientForm.controls.vehicleBrand.setValue(client.vehicleBrand);
	}

	checkForm(data: any) {
		// Validação do formulário
		this.formValidation = new ClientFormValidation();
		this.formValidation = this.checkName(data.name);
		this.formValidation = this.checkCpf(data.cpf);
		this.formValidation = this.checkPhone(data.phone);
		this.formValidation = this.checkBirthDay(data.birthday);
		this.formValidation = this.checkAddress(data.address);
		this.formValidation = this.checkVehicleBrand(data.vehicleBrand);
		this.formValidation = this.checkVehicleModel(data.vehicleModel);
		return this.formValidation.valid;
	}

	checkName(name: string) {
		// Validação do nome
		let nameRE = new RegExp(/[^\wÀ-ú\s]+/g);

		if(name.length < 1) {
			this.formValidation.name = 'required';
			this.formValidation.valid = false;
		} else if(name.length < 3) {
			this.formValidation.name = 'minlength';
			this.formValidation.valid = false;
		} else if(nameRE.test(name)) {
			this.formValidation.name = 'invalid';
			this.formValidation.valid = false;
		}

		return this.formValidation;
	}

	checkCpf(cpf: string) {
		// Validação do CPF
		if(cpf.length < 1) {
			this.formValidation.cpf = 'required';
			this.formValidation.valid = false;
		} else {
			let cpfRE = new RegExp(/\d{11}/);

			if(cpf.length < 11 || !cpfRE.test(cpf)) {
				this.formValidation.cpf = 'invalid';
				this.formValidation.valid = false;
			}
		}

		return this.formValidation;
	}

	checkPhone(phone: string) {
		// Validação do telefone
		if(phone.length < 1) {
			this.formValidation.phone = 'required';
			this.formValidation.valid = false;
		} else {
			let phoneRE = new RegExp(/\d{10,11}/);

			if(phone.length < 10 || !phoneRE.test(phone)) {
				this.formValidation.phone = 'invalid';
				this.formValidation.valid = false;
			}
		}

		return this.formValidation;
	}

	checkBirthDay(birthday: string) {
		// Validação da data de nascimento
		if(birthday.length < 1) {
			this.formValidation.birthday = 'required';
			this.formValidation.valid = false;
		} else {
			let dateRE = new RegExp(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);

			if(birthday.length != 10 || !dateRE.test(birthday)) {
				this.formValidation.birthday = 'invalid';
				this.formValidation.valid = false;
			}
		}

		return this.formValidation;
	}

	checkAddress(address: string) {
		// Validação do endereço
		if(address.length < 1) {
			this.formValidation.address = 'required';
			this.formValidation.valid = false;
		} else {
			if(address.length < 4 || parseInt(address)) {
				this.formValidation.address = 'invalid';
				this.formValidation.valid = false;
			}
		}

		return this.formValidation;
	}

	checkVehicleBrand(vehicleBrand: string) {
		// Validação da marca do veículo
		if(!parseInt(vehicleBrand)) {
			this.formValidation.vehicleBrand = 'required';
			this.formValidation.valid = false;
		}

		return this.formValidation;
	}

	checkVehicleModel(vehicleModel: string) {
		// Validação do modelo do veículo
		if(!parseInt(vehicleModel)) {
			this.formValidation.vehicleModel = 'required';
			this.formValidation.valid = false;
		}

		return this.formValidation;
	}
}
