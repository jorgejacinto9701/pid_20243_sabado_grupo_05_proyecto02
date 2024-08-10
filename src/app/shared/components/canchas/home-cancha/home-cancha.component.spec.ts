import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCanchaComponent } from './home-cancha.component';

describe('HomeCanchaComponent', () => {
  let component: HomeCanchaComponent;
  let fixture: ComponentFixture<HomeCanchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCanchaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeCanchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
