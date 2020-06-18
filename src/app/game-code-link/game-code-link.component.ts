import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { faLink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-game-code-link',
  templateUrl: './game-code-link.component.html',
  styleUrls: ['./game-code-link.component.scss']
})
export class GameCodeLinkComponent implements OnInit {
  @Input() code: string;
  faLink = faLink;

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onGameCodeLinkClick() {
    let linkHost = window.location.href.replace(window.location.pathname, '');
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = `${linkHost}/join/${this.code}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastr.success('Sharing link copied to clipboard');
  }

}
