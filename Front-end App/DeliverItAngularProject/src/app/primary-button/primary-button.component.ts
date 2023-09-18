import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss']
})
export class PrimaryButtonComponent {
  @Input() title: string;
  @Output() buttonClicked = new EventEmitter<void>();

  onClickButton() {
    this.buttonClicked.emit()
  }
}
