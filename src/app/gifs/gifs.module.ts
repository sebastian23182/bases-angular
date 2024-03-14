import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { GifsMainPageComponent } from './pages/main-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    GifsMainPageComponent,
    SearchBoxComponent,
    CardListComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    GifsMainPageComponent
  ]
})
export class GifsModule { }
