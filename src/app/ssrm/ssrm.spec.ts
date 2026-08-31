import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ssrm } from './ssrm';

describe('Ssrm', () => {
  let component: Ssrm;
  let fixture: ComponentFixture<Ssrm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ssrm],
    }).compileComponents();

    fixture = TestBed.createComponent(Ssrm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
