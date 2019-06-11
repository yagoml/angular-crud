// Serviço de comunicação com o componente do menu superior (Top Menu)

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopMenuService {
  private filter = new Subject<string>();
  private activeLink = new Subject<string>();
  private textLink = new Subject<string>();

  sendFilter(filter: string) {
	// Envia filtro de busca
	this.filter.next(filter);
  }

  clearFilter() {
	// Reseta filtro
	this.filter.next();
  }

  getFilter(): Observable<string> {
	// Retorna filtro atual
	return this.filter.asObservable();
  }

  changeActiveLink(activeLink: string) {
	// Altera o link ativo no menu
	this.activeLink.next(activeLink);
  }

  getActiveLink(): Observable<any> {
	// Retorna link ativo
	return this.activeLink.asObservable();
  }

  changeTextLink(textLink: string) {
	// Altera o texto do link ativo
	this.textLink.next(textLink);
  }

  getTextLink(): Observable<any> {
	// Retorna o texto do link ativo
	return this.textLink.asObservable();
  }
}
