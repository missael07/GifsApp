import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  constructor(private gs: GifsService) { }

  get history(): string[] {
    return this.gs.history;
  }

  buscar(termino: string): void {
    console.log(termino);
    this.gs.buscarGifs(termino);
  }
}
