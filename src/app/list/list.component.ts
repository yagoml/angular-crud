// Base de Clientes (tabela)

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomersService } from '../services/customers.service';
import { HelperService } from '../services/helper.service';
import { Client } from '../models/client.model';
import { TopMenuService } from '../services/top-menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  customers: Array<any>; // Clientes da base
  filterSubs: Subscription; // Observable do filtro
  filter: string;

  constructor(
	private customersService: CustomersService,
	private helperService: HelperService,
	private topMenuService: TopMenuService
  ) {
	this.topMenuService.changeActiveLink('base');
	this.customers = this.customersService.fetch();
	this.processCustomers();

	this.filterSubs = this.topMenuService.getFilter().subscribe(filter => {
		filter = filter.trim();
		this.customers = this.customersService.fetch();
		this.processCustomers().then(() => {
		if (filter) {
			this.filter = filter.toLowerCase();
			this.customers = this.customers.filter(this.checkFilter.bind(this));
			this.processCustomers();
		} else {
			this.filter = '';
		}
		});
	});
  }

  ngOnInit() {
	this.topMenuService.changeTextLink('Novo Cliente');
  }

  ngOnDestroy() {
	// unsubscribe to ensure no memory leaks
	this.filterSubs.unsubscribe();
  }

  getIndexByID(id: string) {
	// Obtém cliente por ID
	return this.customers.findIndex((client: Client) => client.id === id);
  }

  delete(id: string) {
	// Excluir
	const index = this.getIndexByID(id);

	if (index >= 0) {
		if (
		window.confirm(
			`Deseja realmente excluir o cliente?\n\nNome: ${
			this.customers[index].name
			}\nCPF: ${this.helperService.maskCpf(this.customers[index].cpf)}`
		)
		) {
		this.customers.splice(index, 1);
		this.customersService.remove(id);
		}
	}
  }

  processCustomers() {
	// Processa dados de clientes
	return new Promise(resolve => {
		this.customers.forEach((client: Client, i) => {
		this.customersService
			.getVehicleText(client.vehicleBrand, client.vehicleModel)
			.then((text: string) => {
			client.vehicleText = text;

			if (i === this.customers.length - 1) {
				resolve();
			}
			});
		});
	});
  }

  checkFilter(client: any) {
	// Filtra por: nome, endereço ou veículo
	return (
		client.name.toLowerCase().includes(this.filter) ||
		client.address.toLowerCase().includes(this.filter) ||
		client.vehicleText.toLowerCase().includes(this.filter)
	);
  }
}
