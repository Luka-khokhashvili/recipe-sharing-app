import { Injectable } from '@angular/core';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';

interface ButtonConfig {
  label: string;
  severity?: string;
  outlined?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmationHandlerService {
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  confirmAction(
    event: Event,
    config: {
      message: string;
      header: string;
      acceptAction: () => void;
      acceptSummary: string;
      rejectAction?: () => void;
      rejectSummary: string;
      icon: string;
      severity: 'success' | 'info' | 'warn' | 'error';
      acceptButtonConfig: ButtonConfig;
      rejectButtonConfig: ButtonConfig;
      closable?: boolean;
      closeOnEscape?: boolean;
    }
  ) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: config.message,
      header: config.header,
      icon: config.icon,
      closable: config.closable,
      closeOnEscape: config.closeOnEscape,

      rejectButtonProps: config.rejectButtonConfig,
      acceptButtonProps: config.acceptButtonConfig,

      accept: () => {
        this.messageService.add({
          severity: config.severity,
          summary: 'Confirmed',
          detail: config.acceptSummary,
        });
        config.acceptAction();
      },
      reject: (type: ConfirmEventType) => {
        if (type !== ConfirmEventType.REJECT && config.rejectAction) {
          config.rejectAction();
        }
        this.messageService.add({
          severity: 'info',
          summary: 'Rejected',
          detail: config.rejectSummary,
        });
      },
    });
  }
}
