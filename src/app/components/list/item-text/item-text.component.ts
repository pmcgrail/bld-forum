import { Component, OnInit, Input } from '@angular/core';

export enum ListTextType {
  primary,
  secondary,
  metaLeft,
  metaRight,
}

@Component({
  selector: 'list-item-text',
  templateUrl: './item-text.component.html',
  styleUrls: ['./item-text.component.scss'],
})
export class ItemTextComponent implements OnInit {
  @Input() type: ListTextType;

  constructor() {}

  ngOnInit(): void {}
}
