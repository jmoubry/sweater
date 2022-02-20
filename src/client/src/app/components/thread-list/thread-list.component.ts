import { Component, OnInit } from '@angular/core';
import { Thread } from 'src/app/models/thread';
import { ThreadService } from '../../services/thread.service';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.scss']
})
export class ThreadListComponent implements OnInit {
  threads: Thread[];

  constructor(private threadService: ThreadService) { }

  ngOnInit(): void {
    this.threadService.getThreads().subscribe((response) => {
      this.threads = response.data;
    });
  }
}
