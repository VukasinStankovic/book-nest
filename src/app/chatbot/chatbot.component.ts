import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  Inject,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChatbotService } from './chatbot.service';

enum MessageSender {
  User = 'User',
  Chatbot = 'Chatbot',
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent implements DoCheck {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  chatbotOpened: boolean;
  currentTime!: string;
  userMessage: string = '';
  conversation: {
    message: string;
    timestamp: string;
    sender: MessageSender;
  }[] = [];
  botMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<ChatbotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private chatbotService: ChatbotService
  ) {
    this.chatbotOpened = data.chatbotOpened;
  }

  ngOnInit(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  private previousLength = 0;
  ngDoCheck(): void {
    if (this.conversation.length !== this.previousLength) {
      this.previousLength = this.conversation.length;
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    const container = this.chatContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  readUserMessage(): void {
    if (this.userMessage.trim()) {
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      this.conversation.push({
        message: this.userMessage,
        timestamp: formattedTime,
        sender: MessageSender.User,
      });

      // ?proveriti da li radi
      let messageObj = {
        message: this.userMessage,
      };
      this.chatbotService.sendUserMessage(messageObj).subscribe(
        (response) => {
          console.log('Ovo je res: ', response);

          response.forEach((item: { text: string }) => {
            this.conversation.push({
              message: item.text,
              timestamp: formattedTime,
              sender: MessageSender.Chatbot,
            });
          });
        },
        (error) => {
          console.error('Greška pri slanju:', error);
        }
      );

      this.userMessage = '';
    }
  }

  closeChatbot(): void {
    this.chatbotOpened = true;
    this.dialogRef.close(this.chatbotOpened);
  }
}
