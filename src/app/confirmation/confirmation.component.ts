import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  titleText:string
  bodyText:string
  negativeText:string
  affirmativeText:string
  private confirmationSource = new ReplaySubject<boolean>(1);
  confirmation$ = this.confirmationSource.asObservable();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onAffirmativeClick() {
    this.confirmationSource.next(true);
  }

  onNegativeClick() {
    this.confirmationSource.next(false);
  }

}
