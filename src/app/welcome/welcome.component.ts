import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  username = '';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.username = params['username'];
    });
  }
}
