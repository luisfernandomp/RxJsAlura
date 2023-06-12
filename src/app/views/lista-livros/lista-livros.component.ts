import { FormControl } from '@angular/forms';
import { Item, LivrosResultado } from './../../models/interfaces';
import { Component } from '@angular/core';
import { EMPTY, Observable, catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap, throwError } from 'rxjs';
import { Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const timePause = 300; //Em milissegundos

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  campoBusca = new FormControl();
  mensagemErro = "";
  livros: LivrosResultado;

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      debounceTime(timePause),
      filter(valorDigitado => valorDigitado.length >= 3),
      distinctUntilChanged(),
      switchMap(valorDigitado => this.service.buscar(valorDigitado)),
      map(resultado => this.livros = resultado),
      map(resultado => resultado.items ?? []),
      map(items => this.livrosResultado(items)),
      catchError(error => {
        this.mensagemErro = "Ocorreu um erro"
        return EMPTY;
        /*
          console.log(erro);
          return throwError(() => new Error())
        */
      })
    )

  livrosResultado(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item);
    });
  }
}



