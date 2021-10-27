import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private api_key = '4DAmG178gGyNtvEFGmBzjn4fAG1UWCZU';
  private serviceUrl = 'https://api.giphy.com/v1/gifs';
  private _history: string[] = [];

  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

 

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')! ) || [];
    if (localStorage.getItem('query')) {
      const resultQuery = localStorage.getItem('resultados') || '';
      this.buscarGifs(resultQuery);
    }
  }

  buscarGifs = (query: string) => {
    query = query.trim().toLowerCase();
    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);
      localStorage.setItem('history', JSON.stringify(this._history));
      localStorage.setItem('query', query);
    }

    const params = new HttpParams()
      .set('api_key', this.api_key)
      .set('q', query)
      .set('limit', '12');

    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe( (resp: SearchGifsResponse) => {
        this.results = resp.data;
      });
  }
}
