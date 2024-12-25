import { ConversationFlavor } from '@grammyjs/conversations';
import { Context, SessionFlavor } from 'grammy';

export interface SessionData {
  count: number;
}

export type MyContext = Context &
  ConversationFlavor &
  SessionFlavor<SessionData>;

export enum IdConversations {
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
