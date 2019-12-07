import { Component, Inject, InjectionToken, OnInit, TemplateRef } from '@angular/core';
import { ModalReference } from './modal.reference';

interface ModalButton {
    title: string;
    callBack?: () => void;
    dismissOnCall?: boolean;
}

interface SimpleModal {
    title: string;
    body: string;
    primaryButton: ModalButton;
    secondaryButton: ModalButton;
}

interface TemplateModal {
    template: TemplateRef<any>;
}

export type ModalConfig = SimpleModal | TemplateModal;

export const MODAL_CONFIG_TOKEN = new InjectionToken('modal-config');

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  isTemplateModal = false;

  constructor(
    // private modalRef: ModalReference,
    @Inject(MODAL_CONFIG_TOKEN) private _modalConfig: ModalConfig
  ) { }

  ngOnInit() {
    this.isTemplateModal = this.isConfigTemplate(this._modalConfig);
  }

  isConfigTemplate(config: ModalConfig): config is TemplateModal {
    return this._modalConfig['template'] !== undefined;
  }

  get modalConfig() {
    return this._modalConfig;
  }

  buttonAction(buttonType: 'primaryButton' | 'secondaryButton') {
    if (this.isConfigTemplate(this._modalConfig)) { return; }
    const { callBack, dismissOnCall } = this._modalConfig[buttonType];
    if (callBack) {
        callBack();
    }
    if (dismissOnCall) {
        this.close();
    }
  }

  close() {
    // this.modalRef.close();
  }

}
