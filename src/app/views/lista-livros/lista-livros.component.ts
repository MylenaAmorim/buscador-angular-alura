import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item, Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: Livro[];
  campoBusca = '';
  subscription: Subscription;
  livro: Livro;

  constructor(private service: LivroService) { }

  buscarLivro() {
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      next: items => {
        this.listaLivros = this.livrosResultadoParaLivros(items);
        console.log("this.listaLivros", this.listaLivros)
      },
      error: erro => {
        console.log("", erro)
      }
    }
    )
  }

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}



