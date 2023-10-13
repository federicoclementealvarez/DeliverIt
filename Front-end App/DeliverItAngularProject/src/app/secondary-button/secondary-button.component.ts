import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-secondary-button',
  templateUrl: './secondary-button.component.html',
  styleUrls: ['./secondary-button.component.scss']
})
export class SecondaryButtonComponent {
  @Input() title: string;
  @Output() buttonClicked = new EventEmitter<void>();

  onClickButton() {
    this.buttonClicked.emit()
  }
}
