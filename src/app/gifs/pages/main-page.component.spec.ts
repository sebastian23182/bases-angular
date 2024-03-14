import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifsMainPageComponent } from '../pages/main-page.component';

describe('MainPageComponent', () => {
  let component: GifsMainPageComponent;
  let fixture: ComponentFixture<GifsMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GifsMainPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GifsMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
