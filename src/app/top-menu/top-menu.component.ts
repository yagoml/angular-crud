import { Component, OnInit, Input } from '@angular/core';
import { TopMenuService } from '../services/top-menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  subsActiveLink: Subscription;
  subsTextLink: Subscription;
  @Input()
  filter: string;

  constructor(private topMenuService: TopMenuService) {
	// Ouve por mudanças no link ativo
	this.subsActiveLink = this.topMenuService
		.getActiveLink()
		.subscribe(activeLink => {
		if (activeLink) {
			this.selectLink(activeLink);
		}
		});
	// Ouve por mudanças no texto do link ativo
	this.subsTextLink = this.topMenuService
		.getTextLink()
		.subscribe(textLink => {
		if (textLink) {
			this.chooseEditionLink(textLink);
		}
		});
  }

  ngOnInit() {}

  selectLink(link: string) {
	document.getElementById('base').className = '';
	document.getElementById('add').className = '';
	document.getElementById(link).className = 'selected';
  }

  chooseEditionLink(text: string) {
	document.getElementById('add').textContent = text;
  }

  changeFilter(event: any) {
	this.filter = event.target.value;
	this.topMenuService.sendFilter(this.filter);
  }
}
