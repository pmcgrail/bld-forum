import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';

import { IComment, IUser } from 'src/app/models';
import { AuthService } from 'src/app/providers';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent implements OnInit {
  @Input() comment: IComment;

  owner = false;

  @Output() delete: EventEmitter<null> = new EventEmitter();
  @Output() report: EventEmitter<null> = new EventEmitter();

  constructor(private auth: AuthService) {
    this.auth.user$.pipe(take(1)).subscribe((authUser: IUser) => {
      this.owner = this.comment.userId === authUser.uid;
    });
  }

  onDelete() {
    this.delete.emit();
  }

  onReport() {
    this.report.emit();
  }

  ngOnInit() {}
}
