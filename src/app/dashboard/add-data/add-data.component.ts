import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';


import * as moment from 'moment';
// import { stat } from 'fs';
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

  constructor(private formbuilder: FormBuilder, public storeService: StoreService, public backendService: BackendService, public dialog: MatDialog) {
  }
  public addChildForm: any;
  @Input() currentPage!: number;
  date = new FormControl(moment());
  @ViewChild('myModal') myModal!: ElementRef;

  ngOnInit(): void {
    this.addChildForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      kindergardenId: ['', Validators.required],
      birthDate: [null, Validators.required],
      registrationDate: [null, Validators.required]
    })


  }

  onSubmit(formDirective: FormGroupDirective): void {
    if(this.addChildForm.valid) {

      const dialogRef = this.dialog.open(DialogComponent, {
        data: { header: 'Kind anmelden', text: 'Stimmen die Daten des anzumeldenden Kindes?'}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(this.addChildForm.value);
          this.backendService.addChildData(this.addChildForm.value, this.currentPage);
          formDirective.resetForm();
          this.addChildForm.reset();
          this.openModal();
        }
      });
    }
  }

  openModal() {
    this.myModal.nativeElement.style.display = 'flex';
  }

  closeModal() {
    this.myModal.nativeElement.style.display = 'none';
  }

}
