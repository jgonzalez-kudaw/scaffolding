import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import * as React from 'react';
import { createRoot } from 'react-dom/client';

@Component({
    standalone: true,
    selector: 'app-react-wrapper',
    template: `<div #reactContainer></div>`,
    imports: [],
})
export class ReactWrapperComponent implements AfterViewInit {
    @ViewChild('reactContainer', { static: true }) reactContainer!: ElementRef;

    private root!: ReturnType<typeof createRoot>;

    constructor() {
        console.log('constructor react wrapper');
    }

    async ngAfterViewInit(): Promise<void> {
        // Cargar el módulo remoto
        const { default: Header } = await loadRemoteModule({
            remoteName: 'reactRemote',
            remoteEntry: 'http://localhost:8080/remoteEntry.js',
            exposedModule: './Header',
        });

        console.log(Header);

        // Crear el root y renderizar el componente React
        this.root = createRoot(this.reactContainer.nativeElement);
        // this.root.render(<Header />); // Asegúrate de usar la sintaxis JSX
    }

    ngOnDestroy() {
        // Limpiar el componente React cuando el componente Angular se destruya
        this.root.unmount();
    }
}
