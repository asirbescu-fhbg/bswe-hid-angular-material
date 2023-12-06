import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() showAddData: boolean | undefined;
  @Output() toggleButtonClickEvent = new EventEmitter();

  toggleButtonClicked() {
    this.toggleButtonClickEvent.emit(!this.showAddData);
  }

}
