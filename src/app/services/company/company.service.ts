import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBusiness } from 'src/app/models/Company.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  getCompanies(): Observable<IBusiness[]> {
    const url = environment.api.info;

    return this.http.get<IBusiness[]>(url);
  }

  getCompany(id: number): Observable<IBusiness> {
    const url = `${environment.api.info}/${id}`;

    return this.http.get<IBusiness>(url);
  }
}
