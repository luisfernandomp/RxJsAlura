import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Item, LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly
  API = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private htpp: HttpClient) { }

  buscar(valorDigitado: string): Observable<LivrosResultado> {
    const params = new HttpParams()
      .append('q', valorDigitado);

      return this.htpp.get<LivrosResultado>(this.API, { params });
  }
}
