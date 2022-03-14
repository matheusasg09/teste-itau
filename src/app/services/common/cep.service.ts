import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CEP } from '../../models/CEP.interface';

@Injectable({
  providedIn: 'root',
})
export class CEPService {
  constructor(private http: HttpClient) {}

  getCep(CEP: string): Observable<CEP> {
    const CEPDigitsOnly = CEP.replace(/\D/g, '');
    const validateCEP = /^[0-9]{8}$/;

    if (!validateCEP.test(CEPDigitsOnly)) {
      throw new Error('CEP inválido');
    }
    const url = `https://viacep.com.br/ws/${CEPDigitsOnly}/json/`;

    return this.http.get<CEP>(url);
  }
}
