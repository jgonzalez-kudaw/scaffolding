import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactWrapperComponent } from "./module/main/react-wrapper/react-wrapper.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactWrapperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'angular-module-federation';

  constructor() { }

  ngOnInit(): void {

    console.log('on init');

    
  }
}
