import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { BehaviorSubject } from 'rxjs';
import {
  LoadingDialogComponent,
  LoadingDialogComponentData,
} from './loading-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingDialogService {
  constructor(private dialog: MatDialog) {}

  open(message: string) {
    const message$ = new BehaviorSubject<string>(message);

    const dialogRef = this.dialog.open<
      LoadingDialogComponent,
      LoadingDialogComponentData,
      undefined
    >(LoadingDialogComponent, { data: { message$ }, disableClose: true });

    return {
      next: (message: string) => message$.next(message),
      close: () => {
        dialogRef.close();
        message$.complete();
      },
    };
  }
}
