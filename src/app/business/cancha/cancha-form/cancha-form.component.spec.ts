import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanchaFormComponent } from './cancha-form.component';

describe('CanchaFormComponent', () => {
  let component: CanchaFormComponent;
  let fixture: ComponentFixture<CanchaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanchaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CanchaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
