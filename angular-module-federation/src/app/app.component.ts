import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'angular-module-federation';

  constructor() { }

  ngOnInit(): void {

    console.log('on init');

    import('remoteApp/App')
      .then((module) => {
        const ReactComponent = module.default;

        const reactRoot = document.getElementById('react-root');
        if (reactRoot) {
          console.log('aaaaaaaaaaaaaaa')
         //  const root = ReactDOM.createRoot(reactRoot);
         //  root.render(<ReactComponent />);
        }
      })
      .catch((error) => {
        console.error('Error loading remote component:', error);
      });
  }
}
