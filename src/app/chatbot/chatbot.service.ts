import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private apiUrl = 'http://localhost:5006/webhooks/rest/webhook';

  constructor(private http: HttpClient) {}

  sendUserMessage(message: { message: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, message);
  }
}
