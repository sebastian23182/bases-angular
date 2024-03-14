import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { type Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
  styleUrl: 'card.component.css',
})
export class CardComponent implements OnInit {
  @Input()
  public gif!: Gif;

  @Input()
  public fav: boolean = false;

  @Output()
  addFavorite: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    if (!this.gif) throw new Error('Gif property is required');
  }

  addFavoriteGif() {
    this.addFavorite.emit(this.gif.id);
  }
}
