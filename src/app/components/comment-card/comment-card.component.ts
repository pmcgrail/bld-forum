import { Component, OnInit, Input } from '@angular/core';
import { IComment } from 'src/app/models';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent implements OnInit {
  @Input()
  comment: IComment;

  constructor() {}

  ngOnInit(): void {}
}
