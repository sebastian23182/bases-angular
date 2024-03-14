import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type Gif, type SearchResponse } from '../interfaces/gifs.interface';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public showFavs: boolean = false;
  public gifsList: Gif[] = [];
  public lastTag: string = '';
  
  private _favGifs: Gif['id'][] = [];
  private _tagsHistory: string[] = [];
  private _offset: number = 0;
  private _loading: boolean = false;

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
    this.loadLocalStorageFavs();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  get favGifs() {
    return [...this._favGifs];
  }

  get loading() {
    return this._loading;
  }

  private organizeHistory(tag: string) {
    if (tag !== this.lastTag) {
      this.gifsList = [];
      this._offset = 0;
    }

    if (this.showFavs) {
      this.gifsList = [];
      this._offset = 0;
    }

    if (this._tagsHistory.includes(tag)) this._tagsHistory = this._tagsHistory.filter((old) => old !== tag);
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage() {
    localStorage.setItem('bases-angular-history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage() {
    if (!localStorage.getItem('bases-angular-history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('bases-angular-history')!);
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag: string) {
    this._loading = true;

    if (!tag) return;
    tag = tag.toLowerCase();

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', environment.GIPHY_API_KEY)
      .set('limit', 20)
      .set('q', tag)
      .set('offset', this._offset.toString());

    this.http.get<SearchResponse>('https://api.giphy.com/v1/gifs/search', { params })
      .subscribe((res) => {
        this.lastTag = tag;
        this.gifsList = [...this.gifsList, ...res.data.filter((gif) => !this.gifsList.some((exist) => exist.id === gif.id))];
        this._offset += res.pagination.count;
        this.showFavs = false;
        this._loading = false;
      });
  }

  deleteTag(tag: string) {
    this._tagsHistory = this._tagsHistory.filter((item) => item !== tag);
    if (!this._tagsHistory.length) this.lastTag = '';
    this.saveLocalStorage();
  }

  searchFavs() {
    this._loading = true;
    this.gifsList = [];
    this._offset = 0;
    const params = new HttpParams()
      .set('api_key', environment.GIPHY_API_KEY)
      .set('ids', this._favGifs.join(','));

    this.http.get<SearchResponse>('https://api.giphy.com/v1/gifs', { params })
      .subscribe((res) => {
        this.gifsList = [...res.data];
        this._loading = false;
      });
  }

  saveLocalStorageFavs() {
    localStorage.setItem('bases-angular-favs', JSON.stringify(this._favGifs));
  }

  loadLocalStorageFavs() {
    if (!localStorage.getItem('bases-angular-favs')) return;
    this._favGifs = JSON.parse(localStorage.getItem('bases-angular-favs')!);
  }

  addFavorite(id: Gif['id']) {
    if (this._favGifs.includes(id) && this.showFavs) {
      this._favGifs = this._favGifs.filter((old) => old !== id);
      this.gifsList = this.gifsList.filter((gif) => gif.id !== id);
      this.saveLocalStorageFavs();

      if (!this._favGifs.length) {
        this._offset = 0;
        this.searchTag(this._tagsHistory[0]);
        this.showFavs = false;
      }

      return;
    }

    if (this._favGifs.includes(id) && !this.showFavs) {
      this._favGifs = this._favGifs.filter((old) => old !== id);
      this.saveLocalStorageFavs();
      return;
    }

    this._favGifs.push(id);
    this.saveLocalStorageFavs();
  }

  toggleFavs() {
    if (this._favGifs.length) {
      this.showFavs = !this.showFavs;

      if (!this.showFavs) {
        this.gifsList = [];
        this._offset = 0;
        this.searchTag(this._tagsHistory[0]);
        return;
      }

      this.searchFavs();
      return;
    }

    if (!this._favGifs.length && this.showFavs) {
      this.searchTag(this._tagsHistory[0]);
      this.showFavs = !this.showFavs;
    }
  }
}
