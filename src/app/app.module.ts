import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LobbyComponent } from './lobby/lobby.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { HttpClientModule } from '@angular/common/http';
import { GameComponent } from './game/game.component';
import { ToastrModule } from 'ngx-toastr';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { HudComponent } from './hud/hud.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LobbyComponent,
    ConfirmationComponent,
    GameComponent,
    OnlyNumberDirective,
    HudComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationComponent
  ]
})
export class AppModule { }
