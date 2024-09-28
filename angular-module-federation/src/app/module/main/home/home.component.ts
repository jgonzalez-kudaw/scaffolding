import { Component } from '@angular/core';
import { ReactWrapperComponent } from "../react-wrapper/react-wrapper.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactWrapperComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
