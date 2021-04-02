import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StvExpansionPanelComponent } from './stv-expansion-panel.component';

describe('StvExpansionPanelComponent', () => {
  let component: StvExpansionPanelComponent;
  let fixture: ComponentFixture<StvExpansionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StvExpansionPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StvExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
