import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { type Gif } from '../interfaces/gifs.interface';

@Component({
  selector: 'app-gifs-main-page',
  templateUrl: './main-page.component.html',
})
export class GifsMainPageComponent {
  constructor(private gifsService: GifsService) {}

  get gifs() {
    return this.gifsService.gifsList;
  }

  get favs() {
    return this.gifsService.favGifs;
  }

  get loading() {
    return this.gifsService.loading;
  }

  loadMore() {
    this.gifsService.searchTag(this.gifsService.tagsHistory[0]);
  }

  addFavorite(id: Gif['id']) {
    this.gifsService.addFavorite(id);
  }
}
