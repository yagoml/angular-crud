import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { CustomersService } from './services/customers.service';

// Biblioteca p/ máscaras
import { NgxMaskModule, IConfig } from 'ngx-mask';
export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
	declarations: [
		AppComponent,
		ListComponent,
		AddComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		HttpClientModule,
		NgxMaskModule.forRoot(options),
		RouterModule.forRoot([
			{ path: '', component: ListComponent },
			{ path: 'add', component: AddComponent },
			{ path: 'edit/:id', component: AddComponent }
		])
	],
	providers: [CustomersService],
	bootstrap: [AppComponent]
})
export class AppModule {}