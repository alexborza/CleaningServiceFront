import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input('items') items!: MenuItem[];
  @Input('nameToDisplay') nameToDisplay: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
