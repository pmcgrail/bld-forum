import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { PostService, UserService } from '../../providers';
import { IUser } from '../../models';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  posts$;
  users$;
  destroy$: Subject<null> = new Subject();

  constructor(private service: PostService) {}

  ngOnInit() {
    this.posts$ = this.service.getPosts();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
