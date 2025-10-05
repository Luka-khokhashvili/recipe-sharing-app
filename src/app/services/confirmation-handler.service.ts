import { Injectable } from '@angular/core';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationHandlerService {
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  // --- UNIFIED CONFIRMATION FUNCTION ---
  confirmAction(
    event: Event,
    config: {
      message: string;
      header: string;
      acceptAction: () => void; // Callback for successful confirmation
      acceptSummary: string;
      rejectAction?: () => void; // Optional callback for rejection
      rejectSummary: string;
      icon: string;
      severity: 'success' | 'info' | 'warn' | 'error';
    }
  ) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: config.message,
      header: config.header,
      icon: config.icon,

      accept: () => {
        this.messageService.add({
          severity: config.severity,
          summary: 'Confirmed',
          detail: config.acceptSummary,
        });
        config.acceptAction();
      },
      reject: (type: ConfirmEventType) => {
        // Execute optional reject action only if it exists
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
