import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaFilterCanchaComponent } from './reserva-filter-cancha.component';

describe('ReservaFilterCanchaComponent', () => {
  let component: ReservaFilterCanchaComponent;
  let fixture: ComponentFixture<ReservaFilterCanchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaFilterCanchaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservaFilterCanchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
