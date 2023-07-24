import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent {

  @Input() title: string = "-";
  @Input() width: number = 30;
  @Input() height: number = 30;

}
