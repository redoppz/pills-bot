import { Conversation, ConversationFlavor } from "@grammyjs/conversations";
import { Context } from "grammy";

export type ExternalContext = ConversationFlavor<Context>;
export type InternalContext = Context;
export type ConversationContext = Conversation<
  ExternalContext,
  InternalContext
>;

export type BotContext = Context & ConversationFlavor<Context>;
