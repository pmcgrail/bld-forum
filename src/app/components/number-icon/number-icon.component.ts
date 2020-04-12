import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-number-icon',
  templateUrl: './number-icon.component.html',
  styleUrls: ['./number-icon.component.scss'],
})
export class NumberIconComponent implements OnInit {
  @Input() number: number;

  constructor() {}

  ngOnInit() {}
}
