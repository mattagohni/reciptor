import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {SharedMaterialModule} from "@reciptor/shared/material";
import {FormsModule} from "@angular/forms";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, TranslateModule.forRoot(), SharedMaterialModule, FormsModule, NoopAnimationsModule],
      declarations: [ FormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
