import { Component, OnInit } from '@angular/core';
import { Thread } from 'src/app/models/thread';
import { ThreadService } from 'src/app/services/thread.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {
  thread: Thread;
  navigated: boolean;

  constructor(
    private route: ActivatedRoute,
    private threadService: ThreadService) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.navigated = true;
        this.threadService.getThread(id).subscribe(thread => (this.thread = thread));
      } else {
        this.navigated = false;
        this.thread = new Thread();
      }
    });
  }

}
