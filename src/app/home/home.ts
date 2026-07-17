import { Component, TemplateRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatRippleModule, MatDividerModule, MatDialogModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  @ViewChild('checklistDialog') checklistDialog!: TemplateRef<any>;

  constructor(private dialog: MatDialog) {}

  openChecklist() {
    this.dialog.open(this.checklistDialog, {
      width: '600px',
      autoFocus: false,
      panelClass: 'enterprise-dialog'
    });
  }
}
