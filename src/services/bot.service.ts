import {
  Bot,
  Context,
  MemorySessionStorage,
  session,
  SessionFlavor,
} from "grammy";
import { configDotenv } from "dotenv";
import {
  Conversation,
  conversations,
  createConversation,
} from "@grammyjs/conversations";
import {
  MainBotCommands,
  MyContext,
  ISessionData,
  Conversations,
} from "./types";
import { PillService } from "./pill.service";

configDotenv();

export class BotManager {
  private bot: Bot<MyContext>;

  constructor(private pillService: PillService) {
    this.bot = new Bot<MyContext>(process.env.BOT_TOKEN!);

    this.initializeMiddlewares();
    this.setupConversations();
    this.setupCommands();
  }

  public async start() {
    await this.bot.api.setMyCommands([
      { command: MainBotCommands.Take, description: "Внести прием лекарства" },
      {
        command: MainBotCommands.Count,
        description: "Посмотреть сколько лекарства осталось",
      },
      { command: MainBotCommands.Add, description: "Добавить новое лекарство" },
      {
        command: MainBotCommands.Edit,
        description: "Редактировать старое лекарство",
      },
    ]);
  }

  private initializeMiddlewares() {
    const storage = new MemorySessionStorage<ISessionData>();

    this.bot.use(session({ storage, initial: () => ({ count: 0 }) }));
    this.bot.use(conversations());
  }

  private setupCommands() {
    this.bot.command(MainBotCommands.Take, async (ctx) => {
      await ctx.conversation.enter(Conversations.TakePillConversation);
    });

    this.bot.command(MainBotCommands.Count, async (ctx) => {
      await ctx.conversation.enter(Conversations.CountPillConversation);
    });

    this.bot.command(MainBotCommands.Add, async (ctx) => {
      await ctx.conversation.enter(Conversations.AddPillConversation);
    });

    this.bot.command(MainBotCommands.Edit, async (ctx) => {
      await ctx.conversation.enter(Conversations.EditPillConversation);
    });
  }

  private async setupConversations() {
    await this.setupAddPillConversation();
    await this.setupCountPillConversation();
    await this.setupEditPillConversation();
    await this.takePillConversation();
  }

  private async setupAddPillConversation() {
    const conversation = await this.createConversation(
      async (conversation, ctx) => {
        const pillName = await this.getInput(
          conversation,
          ctx,
          "Напиши название в чат"
        );
        const pillCount = await this.getInput(
          conversation,
          ctx,
          "Напиши количество лекарства"
        );
        const pillCountPerDay = await this.getInput(
          conversation,
          ctx,
          "Выбери, сколько будешь пить раз в день"
        );
        const username = this.getUsername(ctx);
        await this.pillService.addPill(username, {
          pillName,
          pillCount: Number(pillCount),
          pillCountPerDay: Number(pillCountPerDay),
        });

        await ctx.reply(
          `Ты будешь пить лекарство ${pillName} ${pillCountPerDay} раз в день. Всего лекарств - ${pillCount}`
        );
      },
      Conversations.AddPillConversation
    );

    this.bot.use(conversation);
  }

  private async setupCountPillConversation() {
    const conversation = await this.createConversation(
      async (conversation, ctx) => {
        const pillName = await this.getInput(
          conversation,
          ctx,
          "Выбери лекарство"
        );
        // plug func for calc
        // const pillCount = await calc
        await ctx.reply(`У тебя осталось 2 лекарства ${pillName}`);
      },
      Conversations.CountPillConversation
    );

    this.bot.use(conversation);
  }

  private async setupEditPillConversation() {
    const conversation = await this.createConversation(
      async (conversation, ctx) => {
        const pillName = await this.getInput(
          conversation,
          ctx,
          "Выбери лекарство"
        );
        await this.getInput(
          conversation,
          ctx,
          "Что редактируем (Количество лекарства или Время приема)"
        );
        // plug func for calc
        // const pillCount = await calc
        await ctx.reply(`У тебя осталось 2 лекарства ${pillName}`);
      },
      Conversations.EditPillConversation
    );

    this.bot.use(conversation);
  }

  private async takePillConversation() {
    const conversation = await this.createConversation(
      async (conversation, ctx) => {
        const pillName = await this.getInput(
          conversation,
          ctx,
          "Выбери лекарство"
        );
        const pillTime = await this.getInput(
          conversation,
          ctx,
          "Выбери время приема"
        );
        await ctx.reply(`Готово, записал прием ${pillName} ${pillTime}`);
      },
      Conversations.TakePillConversation
    );

    this.bot.use(conversation);
  }

  private async createConversation(
    conversationFn: (
      conversation: Conversation<Context & SessionFlavor<ISessionData>>,
      ctx: Context & SessionFlavor<ISessionData>
    ) => Promise<void>,
    id: string
  ) {
    return createConversation(conversationFn, { id });
  }

  private async getInput(
    conversation: Conversation<Context & SessionFlavor<ISessionData>>,
    ctx: Context & SessionFlavor<ISessionData>,
    prompt: string
  ): Promise<string> {
    await ctx.reply(prompt);
    const { message } = await conversation.wait();
    return message?.text ?? "";
  }

  private getUsername(ctx: Context & SessionFlavor<ISessionData>): string {
    return ctx.chat?.username ?? "default";
  }
}
