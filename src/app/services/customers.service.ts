// Serviço responsável pelos dados dos clientes

import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';
import { VehiclesService } from './vehicles.service';
import { Client } from '../models/client.model'

var storage = window.localStorage; // Armazenamento

@Injectable({
	providedIn: 'root'
})

export class CustomersService {
	customers: Array<Client>; // Lista de clientes
	vehicleBrands: any; // Marcas de veículos
	vehicleModels: any; // Modelos de veículos

	constructor(
		public helper: HelperService,
		private vehiclesService: VehiclesService
	) {
		this.vehicleBrands = this.vehiclesService.getBrands();
		this.fetch();
	}

	add(client: Client) {
		// Adiciona cliente na base
		client.id = this.helper.generateUuid();
		this.customers.push(client);
		this.save();
	}

	edit(client: Client) {
		// Edita cliente da base
		let index = this.getIndexByID(client.id);
		this.customers[index] = client;
		this.save();
	}

	remove(id: string) {
		// Salva dados após exclusão de cliente
		this.save();
	}

	save() {
		// Salva dados de cliente
		storage.setItem('customers', JSON.stringify(this.customers));
	}

	fetch() {
		// Busca clientes na base
		return this.customers = JSON.parse(storage.getItem('customers')) || [];
	}

	reset() {
		// Reseta clientes da base
		this.customers = [];
		storage.setItem('customers', JSON.stringify(this.customers));
	}

	getCustomerByID(id: string) {
		// Obtém cliente por ID
		return this.customers.find(client => client.id == id);
	}

	getIndexByID(id: string) {
		// Obtém index (posição) do cliente na coleção
		return this.customers.findIndex(client => client.id == id);
	}

	getBrandModels(brandID: string) {
		// Obtém modelos de veículos de determinada marca por ID
		return new Promise(resolve => {
			this.vehiclesService.getBrandModels(brandID)
				.then((resp: any) => {
					resolve(resp);
				});
		})
	}

	getVehicleText(brandID: string, modelID: string) {
		// Processa texto do veículo no formato 'marca - modelo'
		return new Promise(resolve => {
			this.vehicleBrands.then((vehicleBrands: Array<any>) => {
				let brand = vehicleBrands.find(brand => brand.codigo == brandID);
	
				this.getBrandModels(brand.codigo).then((models: any) => {
					let model = Object();

					models.forEach((modelo: any) => {
						if(modelo.codigo == parseInt(modelID)){
							model = modelo;
						}
					});

					resolve(brand.nome + ' - ' + model.nome);
				})
			})
		})
	}
}