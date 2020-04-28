import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'list-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() link: string;

  constructor() {}

  ngOnInit() {}
}
