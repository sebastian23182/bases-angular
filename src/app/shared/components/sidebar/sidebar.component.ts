import { Component, OnInit, HostListener } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit{
  public showSideBar: boolean = true; 
  private hasCollapsed: boolean = false;

  constructor(private gifsService: GifsService) {}

  ngOnInit() {
    if (window.innerWidth < 460) {
      this.showSideBar = false;
      this.hasCollapsed = true;
    }
  }
  
  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 460) {
      this.showSideBar = true;
      this.hasCollapsed = false;
    }
    
    if (window.innerWidth < 460 && !this.hasCollapsed) this.showSideBar = false;
  }

  get tagHistory() {
    return this.gifsService.tagsHistory;
  }

  searchTag(tag: string) {
    tag = tag.toLowerCase();
    if (this.gifsService.lastTag === tag && !this.gifsService.showFavs) return;
    this.gifsService.searchTag(tag);
  }

  deleteTag(tag: string) {
    this.gifsService.deleteTag(tag);
  }

  toggleSideBarWidth() {
    this.showSideBar = !this.showSideBar;
    this.hasCollapsed = !this.hasCollapsed;
  }
}
