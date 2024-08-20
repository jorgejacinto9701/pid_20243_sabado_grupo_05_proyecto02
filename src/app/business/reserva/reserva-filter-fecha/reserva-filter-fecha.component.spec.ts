import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaFilterFechaComponent } from './reserva-filter-fecha.component';

describe('ReservaFilterFechaComponent', () => {
  let component: ReservaFilterFechaComponent;
  let fixture: ComponentFixture<ReservaFilterFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaFilterFechaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservaFilterFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
