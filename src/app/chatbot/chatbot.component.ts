import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent {
  chatbotOpened: boolean;
  currentTime!: string;
  userMessage: string = '';
  userMessages: { message: string; timestamp: string }[] = [];
  botMessage: string = '';
  botMessages: { message: string; timestamp: string }[] = [];

  constructor(
    public dialogRef: MatDialogRef<ChatbotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
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

  readUserMessage(): void {
    if (this.userMessage.trim()) {
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      this.userMessages.push({
        message: this.userMessage,
        timestamp: formattedTime,
      });

      this.userMessage = '';
    }
  }

  closeChatbot(): void {
    this.chatbotOpened = true;
    this.dialogRef.close(this.chatbotOpened);
  }
}
