import { Bot } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import { GetCountOfPillConversation } from "./handlers/conversations/get-count-of-pill.conversation";
import { AddNewPillConversation } from "./handlers/conversations/add-new-pill.conversation";
import { EditOldPillConversation } from "./handlers/conversations/edit-old-pill.conversation";
import { BotContext } from "../types";
import { MainCommand } from "./handlers/commands/main.command";

export class BotManager {
  private readonly bot: Bot<BotContext>;

  constructor(
    private readonly mainCommand: MainCommand,
    private readonly addNewPillConversation: AddNewPillConversation,
    private readonly getCountOfPillConversation: GetCountOfPillConversation,
    private readonly editOldPillConversation: EditOldPillConversation,
  ) {
    this.bot = new Bot<BotContext>(process.env.TOKEN_BOT!);
    this.bot.use(conversations());
    this.register();
  }

  public start() {
    this.bot.command("start", async (ctx) => await this.mainCommand.start(ctx));
  }

  private register() {
    this.registerCommands();
    this.registerConversations();
  }

  private registerCommands() {
    this.bot.command("help", async (ctx) => await this.mainCommand.help(ctx));
  }

  private registerConversations() {
    this.bot.use(
      createConversation(this.addNewPillConversation.execute),
      createConversation(this.getCountOfPillConversation.execute),
      createConversation(this.editOldPillConversation.execute),
    );
  }
}
