import { AfterViewChecked, Component, inject, input, OnInit, output, ViewChild } from '@angular/core';
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/message';
import { TimeagoModule } from 'ngx-timeago';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [TimeagoModule, FormsModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements AfterViewChecked{
  @ViewChild('messageForm') messageForm?: NgForm;
  @ViewChild('scrollMe') scrollContainer?: any;
  messageService = inject(MessageService);
  username = input.required<string>();
  //messages = input.required<Message[]>();  //readonly
  messageContent = '';
  //updateMessages = output<Message>();
  loading = false;

  sendMessage(){
    this.loading = true;
    this.messageService.senderMessage(this.username(),this.messageContent).then( () => {
      this.messageForm?.reset();
      this.scrollToBottom();
    }).finally(() => this.loading = false);


    // this.messageService.senderMessage(this.username(),this.messageContent).subscribe({
    //   next: message => {
    //     //this.updateMessages.emit(message);
    //     this.messageForm?.reset();
    //   }
    // })
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    if(this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }


  // ngOnInit(): void {
  //   this.loadMessages(); 
  // }

  // loadMessages(){
  //   this.messageService.getMessageThread(this.username()).subscribe({
  //     next: messages => this.messages = messages
  //   })
  // }
}
