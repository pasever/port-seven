import { OverlayRef } from '@angular/cdk/overlay';

export class ModalReference {
    constructor(
        private readonly overlay: OverlayRef
    ) {}

    close = () => this.overlay.dispose();

    isVisible = () => this.overlay && this.overlay.overlayElement;

    position = () => this.overlay.overlayElement.getBoundingClientRect();
}