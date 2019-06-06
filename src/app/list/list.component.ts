// Base de Clientes (tabela)

import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../services/customers.service';
import { Client } from '../models/client.model'

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
	customers: any; // Clientes da base

	constructor(
		private customersService: CustomersService,
	) {
		this.customers = this.customersService.fetch();
		this.processCustomers();
	}

	ngOnInit() {
	}

	getIndexByID(id: string) {
		// Obtém cliente por ID
		return this.customers.findIndex((client: Client) => client.id == id);
	}

	delete(id: string) {
		// Excluir
		let index = this.getIndexByID(id);

		if(index >= 0) {
			if(window.confirm(`Deseja realmente excluir o cliente?\n\nNome: ${this.customers[index].name}\nCPF: ${this.maskCpf(this.customers[index].cpf)}`)
			) {
				this.customers.splice(index, 1);
				this.customersService.remove(id);
			}
		}
	}

	processCustomers() {
		// Processa dados de clientes
		this.customers.forEach((client: Client) => {
			this.customersService.getVehicleText(client.vehicleBrand, client.vehicleModel)
				.then((text: string) => {
					client.vehicleText = text;
				});
		});
	}

	maskCpf(cpf: string) {
		// Trata o CPF
		let maskedCpf = '';
		maskedCpf += cpf.substr(0, 3) + '.';
		maskedCpf += cpf.substr(3, 3) + '.';
		maskedCpf += cpf.substr(6, 3) + '-';
		maskedCpf += cpf.substr(9, 2);
		return maskedCpf;
	}

	maskPhone(phone: string) {
		// Trata o telefone
		let maskedPhone = '(';

		if(phone.length < 11) {
			maskedPhone += phone.substr(0, 2) + ') ';
			maskedPhone += phone.substr(2, 4) + '-';
			maskedPhone += phone.substr(6, 9);
		} else {
			maskedPhone += phone.substr(0, 2) + ') ';
			maskedPhone += phone.substr(2, 5) + '-';
			maskedPhone += phone.substr(7, 10);
		}
		
		return maskedPhone;
	}

	maskDataBR(data: string){
		// Trata data de nascimento para formato dd/mm/aaaa.
		var date = new Date(data),
			dia  = date.getDate().toString(),
			diaF = (dia.length == 1) ? '0' + dia : dia,
			mes  = (date.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
			mesF = (mes.length == 1) ? '0' + mes : mes,
			anoF = date.getFullYear();

		return diaF+"/"+mesF+"/"+anoF;
	}
}
