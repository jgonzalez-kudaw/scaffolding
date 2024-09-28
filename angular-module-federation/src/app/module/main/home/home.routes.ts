import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

export default [
    {
        path: '',
        component: HomeComponent,
    }
] as Routes;
