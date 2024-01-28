import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { CHILDREN_PER_PAGE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/store.service';
import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  constructor(public storeService: StoreService, private backendService: BackendService, public dialog: MatDialog) {}

  @Input() currentPage!: number;
  @Output() selectPageEvent = new EventEmitter<number>();
  public page: number = 0;
  public pageSize: number = CHILDREN_PER_PAGE;
  public pageLength!: number;
  public filterKindergarten = new FormControl();
  public sortedData = this.storeService.children;

  ngOnInit(): void {
    this.backendService.getChildren(this.currentPage);
  }

  getAge(birthDate: string) {
    var today = new Date();
    var birthDateTimestamp = new Date(birthDate);
    var age = today.getFullYear() - birthDateTimestamp.getFullYear();
    var m = today.getMonth() - birthDateTimestamp.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateTimestamp.getDate())) {
        age--;
    }
    return age;
  }

  getChildrenCount() {
    return this.storeService.childrenTotalCount;
  }
  
  public handlePage(e: any) {
    this.currentPage = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.selectPageEvent.emit(this.currentPage)
    this.backendService.getChildren(this.currentPage);
  }

  public cancelRegistration(childId: string) {
    this.backendService.deleteChildData(childId, this.currentPage);
  }

  public sortData(sort: Sort) {
    const data = this.storeService.children;
    console.log(sort.active + " " + sort.direction)
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'kindergartenName':
          return this.compare(a.kindergarden.name, b.kindergarden.name, isAsc);
        case 'anmeldedatum':
          return this.compare(a.registrationDate, b.registrationDate, isAsc);
        default:
          return 0;
      }
    })

  }

  private compare(a: string, b: string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  public openDialog(childId: string) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.cancelRegistration(childId);
      }
    });
  }

}


