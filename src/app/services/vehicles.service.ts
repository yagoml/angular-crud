// Serviço responsável pelos dados de Veículos
// Pega os dados em armazenados em cache, caso houver, senão faz a requisição p/ API

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

var storage = window.localStorage; // Armazenamento

@Injectable({
    providedIn: 'root'
})

export class VehiclesService {
	brands: Array<any>; // Marcas
    brandsURL: string = 'https://parallelum.com.br/fipe/api/v1/carros/marcas'; // API Marcas url

    constructor(
		private http: HttpClient
    ) {}

    getBrands() {
		// Obtém todas as marcas
		let vehicleBrands = JSON.parse(storage.getItem('vehicleBrands'));

		return new Promise(resolve => {
			if(vehicleBrands) {
				resolve(vehicleBrands);
			} else {
				this.http.get(this.brandsURL, { observe: 'response' })
				.subscribe((resp: any) => {
					this.save('vehicleBrands', resp.body);
					resolve(resp.body);
				});
			}
		})
	}

	getBrandModels(id: string) {
		// Obtém modelos de determinada marca por ID
		return new Promise(resolve => {
			let vehicleBrands = JSON.parse(storage.getItem('vehicleBrands'));

			let vehicleBrand = vehicleBrands.find((brand: any) => {
				return brand.codigo == id;
			})

			if(vehicleBrands.length && vehicleBrand) {
				let vehicleModels = vehicleBrand.models

				if(vehicleModels) {
					resolve(vehicleModels);
					return;
				}
			}
			
			this.http.get(this.brandsURL + `/${id}/modelos`, { observe: 'response' })
				.subscribe((resp: any) => {
					let models = resp.body.modelos;

					if(vehicleBrand) {
						vehicleBrand.models = models;
						this.save('vehicleBrands', vehicleBrands)
					}

					resolve(models);
				})
		})
	}

	save(itemName: string, data: object) {
		// Armazena os dados no localstorage (CACHE)
		storage.setItem(itemName, JSON.stringify(data));
	}

}