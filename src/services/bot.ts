import { Bot, MemorySessionStorage, session } from 'grammy';
import { configDotenv } from 'dotenv';
import { conversations, createConversation } from '@grammyjs/conversations';
import {
  MainBotCommands,
  MyContext,
  ISessionData,
  Conversations,
} from './types';
import { Chat } from 'grammy/types';
import { addPill } from './database';

configDotenv();

export default async function () {
  const bot = new Bot<MyContext>(process.env.BOT_TOKEN!);
  const storage = new MemorySessionStorage<ISessionData>();

  bot.use(session({ storage, initial: () => ({ count: 0 }) }));
  bot.use(conversations());
  bot.use(
    createConversation(
      async (conversation, ctx) => {
        await ctx.reply('Выбери лекарство');
        const { message: pillName } = await conversation.wait();
        await ctx.reply('Выбери время приема');
        const { message: pillTime } = await conversation.wait();
        await ctx.reply(
          `Готово, записал прием ${pillName?.text} ${pillTime?.text}`
        );
      },
      { id: Conversations.TakePillConversation }
    )
  );

  bot.use(
    createConversation(
      async (conversation, ctx) => {
        await ctx.reply('Выбери лекарство');
        const { message: pillName } = await conversation.wait();
        // plug func for calc
        // const pillCount = await calc
        await ctx.reply(`У тебя осталось 2 лекарства ${pillName?.text}`);
      },
      { id: Conversations.CountPillConversation }
    )
  );

  bot.use(
    createConversation(
      async (conversation, ctx) => {
        await ctx.reply('Напиши название в чат');
        const { message: pillName, chat } = await conversation.wait();
        const username = getUsername(chat) ?? 'default';
        await ctx.reply('Напиши количество лекарства');
        const { message: pillCount } = await conversation.wait();
        await ctx.reply('Выбери, сколько будешь пить раз в день');
        const { message: pillCountPerDay } = await conversation.wait();
        const { text: pillNameText } = pillName!;
        const { text: pillCountText } = pillCount!;
        const { text: pillCountPerDayText } = pillCountPerDay!;
        await ctx.reply(
          `Ты будешь пить лекарство ${pillNameText} ${pillCountPerDayText} раз в день. Всего лекарств - ${pillCountText}`
        );

        addPill(username, {
          pillName: pillNameText!,
          pillCount: Number(pillCountText!),
          pillCountPerDay: Number(pillCountPerDayText!),
        });
      },
      { id: Conversations.AddPillConversation }
    )
  );

  bot.use(
    createConversation(
      async (_conversation, ctx) => {
        await ctx.reply('Выбери лекарство');
        // const { message: pillName } = await conversation.wait();
        await ctx.reply(
          'Что редактируем (Количество лекарства или Время приема)'
        );
        // const { message: pillName } = await conversation.wait();
      },
      { id: Conversations.EditPillConversation }
    )
  );

  await bot.api.setMyCommands([
    { command: MainBotCommands.Take, description: 'Внести прием лекарства' },
    {
      command: MainBotCommands.Count,
      description: 'Посмотреть сколько лекарства осталось',
    },
    { command: MainBotCommands.Add, description: 'Добавить новое лекарство' },
    {
      command: MainBotCommands.Edit,
      description: 'Редактировать старое лекарство',
    },
  ]);

  bot.command(MainBotCommands.Take, async (ctx) => {
    await ctx.conversation.enter(Conversations.TakePillConversation);
  });

  bot.command(MainBotCommands.Count, async (ctx) => {
    await ctx.conversation.enter(Conversations.CountPillConversation);
  });

  bot.command(MainBotCommands.Add, async (ctx) => {
    await ctx.conversation.enter(Conversations.AddPillConversation);
  });

  bot.command(MainBotCommands.Edit, async (ctx) => {
    await ctx.conversation.enter(Conversations.EditPillConversation);
  });

  console.log(`The server starting at port ${process.env.PORT}`);
  bot.start();
}

function getUsername(chat?: Chat): string | undefined {
  return chat?.username;
}
