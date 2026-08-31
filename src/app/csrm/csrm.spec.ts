import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Csrm } from './csrm';

describe('Csrm', () => {
  let component: Csrm;
  let fixture: ComponentFixture<Csrm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Csrm],
    }).compileComponents();

    fixture = TestBed.createComponent(Csrm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
