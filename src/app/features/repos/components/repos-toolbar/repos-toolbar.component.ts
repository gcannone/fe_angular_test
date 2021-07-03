import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-repos-toolbar',
  templateUrl: './repos-toolbar.component.html',
  styleUrls: ['./repos-toolbar.component.scss']
})
export class ReposToolbarComponent implements OnInit, OnDestroy {
  @Output() applyEvent = new EventEmitter<any>();

  toolbarForm!: FormGroup;

  searchTypeSelected: 'Name' | 'Issue' = 'Name';
  searchTypes: string[] = ['Name', 'Issue'];

  private _subs = new Subscription();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.toolbarForm = this.fb.group({
      name: ['', [Validators.required]],
      language: [''],
      stars: [null],
      issue: ['']
    });
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  apply() {
    if (this.toolbarForm.valid) {
      this.applyEvent.emit(this.toolbarForm.value);
    } else {
      alert('Validation failed');
    }

  }

  radioChange(value: 'Name' | 'Issue') {
    setTimeout(() => {
      if (value === 'Name') {
        this.toolbarForm.controls['issue'].setValue(null);
        this.toolbarForm.controls['issue'].setErrors(null);
        this.toolbarForm.controls['issue'].clearValidators();
        this.toolbarForm.controls['name'].setValidators(Validators.required);
      } else {
        this.toolbarForm.controls['name'].setValue(null);
        this.toolbarForm.controls['language'].setValue(null);
        this.toolbarForm.controls['stars'].setValue(null);
        this.toolbarForm.controls['name'].setErrors(null);
        this.toolbarForm.controls['name'].clearValidators();
        this.toolbarForm.controls['issue'].setValidators(Validators.required);
      }
      this.toolbarForm.updateValueAndValidity();
    });
  }

}
