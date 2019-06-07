// Base de Clientes (tabela)

import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../services/customers.service';
import { HelperService } from '../services/helper.service';
import { Client } from '../models/client.model';
import { TopMenuComponent } from '../top-menu/top-menu.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  customers: any; // Clientes da base

  constructor(
    private customersService: CustomersService,
    private helperService: HelperService,
    private topMenuComponent: TopMenuComponent
  ) {
    this.topMenuComponent.selectLink('base');
    this.customers = this.customersService.fetch();
    this.processCustomers();
  }

  ngOnInit() {
    this.topMenuComponent.chooseEditionLink('Novo Cliente');
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
    this.customers.forEach((client: Client) => {
      this.customersService
        .getVehicleText(client.vehicleBrand, client.vehicleModel)
        .then((text: string) => {
          client.vehicleText = text;
        });
    });
  }
}
