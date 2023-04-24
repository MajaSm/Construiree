import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-delete-confirmation',
  templateUrl: './dialog-delete-confirmation.component.html',
  styleUrls: ['./dialog-delete-confirmation.component.scss']
})
export class DialogDeleteConfirmationComponent {
  @Output() closeDialog: EventEmitter<any> = new EventEmitter(); 
  @Output() confirmDelete: EventEmitter<any> = new EventEmitter(); 
  eventData: any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<DialogDeleteConfirmationComponent>,) { }
  onClose(): void {
    this.dialogRef.close();
    this.closeDialog.emit(); // Emit the closeDialog event
  }
  onConfirmDelete(): void {
    this.dialogRef.close(true);
    this.confirmDelete.emit()
  }
}
