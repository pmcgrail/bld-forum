import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';

import { IPost, IUser } from 'src/app/models';
import { AuthService } from 'src/app/providers';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() post: IPost;

  @Output() delete: EventEmitter<null> = new EventEmitter();
  @Output() report: EventEmitter<null> = new EventEmitter();

  owner = false;

  onDelete() {
    this.delete.emit();
  }

  onReport() {
    this.report.emit();
  }

  constructor(private auth: AuthService) {
    this.auth.user$.pipe(take(1)).subscribe((authUser: IUser) => {
      this.owner = this.post.userId === authUser.uid;
    });
  }

  ngOnInit() {}
}
