import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { GameSetupService } from '../services/api/game-setup.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit {
  @ViewChild('joinGameModal')
  private joinGameModal: TemplateRef<any>;
  joinGameModalRef: NgbModalRef;

  gameCode = new FormControl('');
  username = new FormControl('');

  newGame: boolean = false;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private gameSetupService: GameSetupService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.route.paramMap.subscribe(params => {
      let sharedCode = params.get('id');
        if (sharedCode) {
          this.gameCode.setValue(sharedCode);
          this.onJoinGameClick();
        }
    });
  }

  onJoinGameClick() {
    this.openUsernameModal();
  }

  onNewGameClick() {
    this.newGame = true;
    this.gameCode.setValue('QXTPRY');
    this.openUsernameModal();
  }

  openUsernameModal() {
    this.joinGameModalRef = this.modalService.open(this.joinGameModal, {ariaLabelledBy: 'modal-basic-title', backdrop: 'static'});
  }

  onUsernameSubmitClick() {
    if (this.newGame) {
      this.gameSetupService.newGame(this.username.value).subscribe(response => {
        this.joinGameModalRef.close();
      });
    } else {
      this.gameSetupService.joinGame(this.gameCode.value, this.username.value).subscribe(response => {
        this.joinGameModalRef.close();
      });
    }
  }

}
