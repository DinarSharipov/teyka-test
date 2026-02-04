import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { debounceTime } from 'rxjs';
import { ButtonComponent } from '../../components/ui/button/button';
import { TagComponent } from '../../components/ui/tag/tag';
import { CardsService } from '../../services/CardsService/CardsService';
import { Card } from '../../services/CardsService/CardsServiceTypes';
import { PushService } from '../../services/PushService/PushService';
import { generateDateOptions } from '../../utils/generateDateOptions';

type Tabs = 'clients' | 'common-settings';

@Component({
  selector: 'app-clients',
  imports: [
    TableModule,
    PaginatorModule,
    SelectModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonComponent,
    TableModule,
    DatePipe,
    TagComponent,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})
export class Clients implements OnInit {
  private cardsService = inject(CardsService);
  private pushService = inject(PushService);
  private messageService = inject(MessageService);
  public cards = signal<Array<Card & { checked: boolean }>>([]);
  public selectedCards: Card[] = [];
  public readonly searchControl = new FormControl('');
  public rows = 10;
  public first = 0;
  public totalSize = 0;
  public activeTab = signal('clients');
  public readonly showSizes = signal([
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 50, value: 50 },
  ]);
  public visible = signal(false);

  public tableLoading = signal(false);
  public pushLoading = signal(false);
  public submitted = signal(false);

  public readonly sendDateOptions = generateDateOptions();
  public selectedSendDate = signal('');
  public pushMessageText = signal('');

  ngOnInit(): void {
    this.fetch();
    this.searchControl.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      this.fetch(value ?? undefined);
    });
  }

  private fetch(searchValue?: string) {
    this.tableLoading.set(true);
    this.cardsService
      .getCards({
        limit: this.rows,
        offset: this.first,
        template: searchValue,
      })
      .subscribe((response) => {
        this.cards.set(response.passes?.map((e) => ({ ...e, checked: false })));
        this.totalSize = response.meta.size ?? 0;
      })
      .add(() => this.tableLoading.set(false));
  }

  public onChangeSize(e: number) {
    this.rows = e;
    this.first = 0;
    this.fetch();
  }

  public onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 0;
    this.fetch();
  }

  public openPush() {
    if (!this.selectedCards.length) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Нет выбранных клиентов!',
        detail: 'Выберите одного или нескольких клиентов для создания Push рассылки',
      });
      return;
    }
    this.visible.set(true);
  }

  public visibleChange(e: boolean) {
    if (!e) {
      this.closePush();
    }
  }

  public closePush() {
    this.visible.set(false);
    this.submitted.set(false);
    this.selectedSendDate.set('');
    this.pushMessageText.set('');
  }

  public setSelectedSendDate(e: { value: string }) {
    this.selectedSendDate.set(e.value);
  }

  public onSendPush() {
    if (!this.pushMessageText() || !this.selectedSendDate()) {
      this.submitted.set(true);
      this.messageService.add({
        severity: 'warn',
        summary: 'Заполните следующие поля:',
        detail: `${!this.pushMessageText ? '- Текст сообщения\n' : ''}${!this.selectedSendDate() ? '- Дата отправки рассылки' : ''}`,
      });
      return;
    }
    this.pushLoading.set(true);
    this.pushService
      .pushMessage({
        date_start: this.selectedSendDate() ?? '',
        push_message: this.pushMessageText(),
        user_id: this.selectedCards.map((e) => e.user_id),
      })
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Успешно добавлено!',
            detail: 'Push уведомления успешно запланированы и будут отправлены в указанную дату',
            life: 3000,
          });
          this.closePush();
        },
        error: (err) => {
          const errorText = err.error?.message ?? JSON.stringify(err.error);
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: errorText,
            life: 5000,
          });
        },
      })
      .add(() => this.pushLoading.set(false));
  }

  public setTab(tab: Tabs) {
    this.activeTab.set(tab);
  }
}
