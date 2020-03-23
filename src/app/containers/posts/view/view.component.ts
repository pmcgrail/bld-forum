import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/providers/posts.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  post$;
  postId: string;
  constructor(private route: ActivatedRoute, private service: PostsService) {
    this.postId = route.snapshot.params['postId'];
  }

  ngOnInit() {
    this.post$ = this.service.getPost(this.postId);
  }
}
