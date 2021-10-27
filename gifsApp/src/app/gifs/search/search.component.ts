import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private gs: GifsService) { }
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;


  buscar = () => {
    const { value } = this.txtBuscar.nativeElement;

    if (value.trim().length === 0) {
      return;
    }

    this.gs.buscarGifs(value);
    this.txtBuscar.nativeElement.value = '';
  }
}
