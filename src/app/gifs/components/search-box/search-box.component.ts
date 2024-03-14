import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: 'search-box.component.css'
})
export class SearchBoxComponent {
  @ViewChild('input')
  public inputTag!: ElementRef<HTMLInputElement>

  constructor(private gifsService: GifsService) {}

  get showFavs() {
    return this.gifsService.showFavs;
  }

  searchTag() {
    const newTag = this.inputTag.nativeElement.value;
    if (newTag.toLocaleLowerCase() === this.gifsService.lastTag) return;
    this.gifsService.searchTag(newTag);
    this.inputTag.nativeElement.value = '';
  }

  toggleFavs() {
    this.gifsService.toggleFavs();
  }
}
