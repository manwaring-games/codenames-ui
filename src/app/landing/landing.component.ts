import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  @ViewChild('joinGameModal')
  private joinGameModal: TemplateRef<any>;

  gameCodeEntry = new FormControl('');
  username = new FormControl('');

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  onJoinGameClick() {
    this.modalService.open(this.joinGameModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(this.gameCodeEntry.value);
      console.log(this.username.value);
    }, (reason) => {
      console.log(this.gameCodeEntry.value);
      console.log(this.username.value);
    });
  }

}
