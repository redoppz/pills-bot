import { Bot } from "grammy";
import start from "./handlers/commands/start.command";
import help from "./handlers/commands/help.command";
import { conversations, createConversation } from "@grammyjs/conversations";
import { GetCountOfPillConversation } from "./handlers/conversations/get-count-of-pill.conversation";
import { AddNewPillConversation } from "./handlers/conversations/add-new-pill.conversation";
import { BotContext } from "../types";

export class BotManager {
  private readonly bot: Bot<BotContext>;

  constructor(
    private readonly addNewPillConversation: AddNewPillConversation,
    private readonly getCountOfPillConversation: GetCountOfPillConversation,
  ) {
    this.bot = new Bot<BotContext>(process.env.TOKEN_BOT!);
    this.bot.use(conversations());
    this.register();
  }

  public start() {
    this.bot.command("start", async (ctx) => await start(ctx));
  }

  private register() {
    this.registerCommands();
    this.registerConversations();
  }

  private registerCommands() {
    this.bot.command("help", async (ctx) => await help(ctx));
  }

  private registerConversations() {
    this.bot.use(
      createConversation(this.addNewPillConversation.execute),
      createConversation(this.getCountOfPillConversation.execute),
    );
  }
}
