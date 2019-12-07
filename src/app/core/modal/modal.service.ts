import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';

import { ModalReference } from './modal.reference';
import {MODAL_CONFIG_TOKEN, ModalComponent, ModalConfig} from './modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private overlay: Overlay,
    private parentInjector: Injector
  ) {}

  private _getInjector(data: ModalConfig, modalRef: ModalReference, parentInjector: Injector) {
    const tokens = new WeakMap();
    tokens.set(MODAL_CONFIG_TOKEN, data);
    tokens.set(ModalReference, modalRef);
    return new PortalInjector(parentInjector, tokens);
  }

  private _getModalConfig() {
      const positionStrategy = this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically();

      return new OverlayConfig({
          scrollStrategy: this.overlay.scrollStrategies.block(),
          positionStrategy,
          hasBackdrop: true
      });
  }

  open(data: ModalConfig) {
      const overlayRef = this.overlay.create(this._getModalConfig());
      const modalRef   = new ModalReference(overlayRef);
      const injector = this._getInjector(data, modalRef, this.parentInjector);
      const modalPortal = new ComponentPortal(ModalComponent, null, injector);
      overlayRef.attach(modalPortal);
      return modalRef;
  }
}
