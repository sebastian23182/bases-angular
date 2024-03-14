import { Component, EventEmitter, Input, Output } from '@angular/core';
import { type Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: 'card-list.component.css',
})
export class CardListComponent {
  @Input()
  public gifs: Gif[] = [];

  @Input()
  public favs: Gif['id'][] = [];
  
  @Input()
  public loading: boolean = false

  @Output()
  loadMore: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  addFavorite: EventEmitter<string> = new EventEmitter<string>();

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    if (element.scrollTop + element.clientHeight >= element.scrollHeight - 5 && !this.loading) {
      this.loadMore.emit();
    }
  }
}