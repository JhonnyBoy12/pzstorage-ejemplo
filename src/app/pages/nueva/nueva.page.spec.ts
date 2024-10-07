import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevaPage } from './nueva.page';

describe('NuevaPage', () => {
  let component: NuevaPage;
  let fixture: ComponentFixture<NuevaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
