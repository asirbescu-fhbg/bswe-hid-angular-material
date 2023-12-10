import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as moment from 'moment';
// import 'moment/locale/de';
// const moment = _moment;
// moment.locale('de');

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_BIRTHDAY_FORMAT = {
  parse: {
    dateInput: 'DD. MMMM YYYY',
  },
  display: {
    dateInput: 'DD. MMMM YYYY',
    monthYearLabel: 'MM.YYYY',
    dateA11yLabel: 'DD',
    monthYearA11yLabel: 'MM',
  },
};

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_BIRTHDAY_FORMAT},
  ]
})
export class AddDataComponent implements OnInit{

  constructor(private formbuilder: FormBuilder, public storeService: StoreService, public backendService: BackendService) {
  }
  public addChildForm: any;
  @Input() currentPage!: number;
  date = new FormControl(moment());

  ngOnInit(): void {
    this.addChildForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      kindergardenId: ['', Validators.required],
      birthDate: [null, Validators.required]
    })
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if(this.addChildForm.valid) {
      console.log(this.addChildForm.value);
      this.backendService.addChildData(this.addChildForm.value, this.currentPage);
      formDirective.resetForm();
      this.addChildForm.reset();
    }
  }
}
