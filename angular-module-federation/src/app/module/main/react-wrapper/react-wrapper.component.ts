import { Component, AfterViewInit, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { CommonModule } from '@angular/common';

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
@if(remoteConectionRefused){
    <div>Error de conexion</div>
}
    <div #reactContainer></div>
    `,
    imports: [CommonModule],
})
export class ReactWrapperComponent implements AfterViewInit {
    @ViewChild('reactContainer', { static: true }) reactContainer!: ElementRef;
    @ViewChild('heroesContainer', { read: ViewContainerRef, static: true }) heroesContainer!: ViewContainerRef;

    remoteConectionRefused: boolean = false;

    private root!: ReturnType<typeof createRoot>;

    constructor() {
        console.log('constructor react wrapper');
    }

    async ngAfterViewInit(): Promise<void> {
        try {
            // Configuracion para establecer conexion con 
            const { default: Header } = await loadRemoteModule({
                remoteName: 'reactRemote',
                remoteEntry: 'http://localhost:8080/remoteEntry.js',
                exposedModule: './Header',
            });

            if (!this.remoteConectionRefused) {
                this.root = createRoot(this.reactContainer.nativeElement);
                this.root.render(React.createElement(Header)); // Asegúrate de usar React.createElement si es un componente React
            }
        }
        catch (error) {

            console.log('errrrrrror')
            console.log(error);

            this.remoteConectionRefused = true;

            // Capturar el error y manejarlo
            console.error('Error cargando el remoteEntry.js', error);

        }
    }

    ngOnDestroy() {
        // Limpiar el componente React cuando el componente Angular se destruya
        this.root.unmount();
    }
}
