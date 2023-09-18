import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss']
})
export class InputPasswordComponent {
  passwordVisible: boolean = false;
  //password: string = '';

  @Input() control: FormControl

  // @Output() valuePasswordChanged = new EventEmitter<string>();

  // onPasswordChanged() {
  //   this.valuePasswordChanged.emit(this.password);
  // }
  
  changeVisibilityPass(visib: boolean) {
    this.passwordVisible = visib;
  }  
}
