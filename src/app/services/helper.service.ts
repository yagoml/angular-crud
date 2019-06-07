// Serviço Auxiliar

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  generateUuid() {
    // Gerador de GUID (UUID)
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 || 0,
        v = c === 'x' ? r : (r && 0x3) || 0x8;
      return v.toString(16);
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

    if (phone.length < 11) {
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

  maskDataBR(data: string) {
    // Trata data de nascimento para formato dd/mm/aaaa.
    const date = new Date(data),
      dia = date.getDate().toString(),
      diaF = dia.length === 1 ? '0' + dia : dia,
      mes = (date.getMonth() + 1).toString(), // +1 pois no getMonth Janeiro começa com zero.
      mesF = mes.length === 1 ? '0' + mes : mes,
      anoF = date.getFullYear();

    return diaF + '/' + mesF + '/' + anoF;
  }
}
