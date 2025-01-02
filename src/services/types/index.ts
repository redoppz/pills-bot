import { ConversationFlavor } from '@grammyjs/conversations';
import { Context, SessionFlavor } from 'grammy';

export interface ISessionData {
  count: number;
}

export interface IPillData {
  pillName: string;
  pillCount: number;
  pillCountPerDay: number;
}

export type MyContext = Context &
  ConversationFlavor &
  SessionFlavor<ISessionData>;

export enum Conversations {
  TakePillConversation = 'takePillConversation',
  CountPillConversation = 'countPillConversation',
  AddPillConversation = 'addPillConversation',
  EditPillConversation = 'editPillConversation',
}

export enum MainBotCommands {
  Take = 'take',
  Count = 'count',
  Add = 'add',
  Edit = 'edit',
}
