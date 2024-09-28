import { Component, AfterViewInit, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import * as React from 'react';
import { createRoot } from 'react-dom/client';

interface HeroesComponent {
    title: string;
    action: {
        subscribe: (callback: () => void) => void;
    };
}

@Component({
    standalone: true,
    selector: 'app-react-wrapper',
    template: `
      Render: Render: <br>
<ng-container #heroesContainer></ng-container>
<br>
--------
<div #reactContainer></div>
    `,
    imports: [],
})
export class ReactWrapperComponent implements AfterViewInit {
    @ViewChild('reactContainer', { static: true }) reactContainer!: ElementRef;
    @ViewChild('heroesContainer', { read: ViewContainerRef, static: true }) heroesContainer!: ViewContainerRef;

    private root!: ReturnType<typeof createRoot>;

    constructor() {
        console.log('constructor react wrapper');

       //  this.loadHeroes();
    }
    
    async ngAfterViewInit(): Promise<void> {
        const { default: Header } = await loadRemoteModule({
            remoteName: 'reactRemote',
            remoteEntry: 'http://localhost:8080/remoteEntry.js',
            exposedModule: './Header',
        });
    
        this.root = createRoot(this.reactContainer.nativeElement);
        this.root.render(React.createElement(Header)); // Asegúrate de usar React.createElement si es un componente React
    }

    // async ngAfterViewInit(): Promise<void> {
        // Aquí puedes cargar el componente React
        // const { default: Header } = await loadRemoteModule({
        //     remoteName: 'reactRemote',
        //     remoteEntry: 'http://localhost:8080/remoteEntry.js',
        //     exposedModule: './Header',
        // });
        
        // Crear el root y renderizar el componente React
        // this.root = createRoot(this.reactContainer.nativeElement);
        // this.root.render(<Header />); // Asegúrate de usar la sintaxis JSX
    // } 

    // ngOnDestroy() {
    //     // Limpiar el componente React cuando el componente Angular se destruya
    //     this.root.unmount();
    // }
}
