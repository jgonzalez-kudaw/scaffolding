import { Routes } from '@angular/router';
import { HomeComponent } from './module/main/home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [

    { path: '', pathMatch: 'full', redirectTo: 'home' },

    {
        path: 'home',
        // canActivate: [NoAuthGuard],
        // canActivateChild: [NoAuthGuard],
        component: HomeComponent,
        data: {
            layout: 'empty'
        },
        children: [
            // {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes')},
            // {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes')},
            // {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes')},
            { path: 'sign-in', loadChildren: () => import('./module/main/home/home.routes') },
            // {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes')}
        ]
    },

    // {
    //     path: 'remote',
    //     loadChildren: () =>
    //         loadRemoteModule({
    //             remoteName: 'reactRemote',
    //             remoteEntry: 'http://localhost:8080/remoteEntry.js',
    //             exposedModule: './Header', // Ruta del módulo expuesto en la app remota
    //         }).then(m => m.RemoteModule),
    // },

 /*    {
        path: 'remote',
        loadChildren: () =>
            loadRemoteModule({
                remoteEntry: 'http://127.0.0.1:8083/remoteEntry.js',
                remoteName: 'remoteApp',
                exposedModule: './App'
            }).then(m => m.App),
    }, */
    //  {
    //      path: 'remote', loadChildren: () => import ('remoteApp/App').then (m => m.default)
 
    //  },


    // 404 & Catch all
    { path: 'page-not-found', pathMatch: 'full', loadChildren: () => import('./module/pages/not-found/not-found.routes') },
    { path: '**', redirectTo: 'page-not-found' }


];
