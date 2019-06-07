import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  selectLink(link: string) {
    document.getElementById('base').className = '';
    document.getElementById('add').className = '';
    document.getElementById(link).className = 'selected';
  }

  chooseEditionLink(text: string) {
    document.getElementById('add').textContent = text;
  }
}
