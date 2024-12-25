import { Bot, MemorySessionStorage, session } from 'grammy';
import { configDotenv } from 'dotenv';
import { conversations, createConversation } from '@grammyjs/conversations';
import {
  IdConversations,
  MainBotCommands,
  MyContext,
  SessionData,
} from './types';

configDotenv();

export default async function () {
  const bot = new Bot<MyContext>(process.env.BOT_TOKEN!);
  const storage = new MemorySessionStorage<SessionData>();

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
      { id: IdConversations.TakePillConversation }
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
      { id: IdConversations.CountPillConversation }
    )
  );

  bot.use(
    createConversation(
      async (conversation, ctx) => {
        await ctx.reply('Напиши название в чат');
        const { message: pillName } = await conversation.wait();
        await ctx.reply('Напиши количество лекарства');
        const { message: pillCount } = await conversation.wait();
        await ctx.reply('Выбери, сколько будешь пить раз в день');
        const { message: pillCountPerDay } = await conversation.wait();
        await ctx.reply('Выбери в какую часть дня будешь пить');
        const { message: pillPerDay } = await conversation.wait();
        await ctx.reply(
          `Ты будешь пить лекарство ${pillName?.text} ${pillCountPerDay?.text} раз в день ${pillPerDay?.text}. Всего лекарств - ${pillCount?.text}`
        );
      },
      { id: IdConversations.AddPillConversation }
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
      { id: IdConversations.EditPillConversation }
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
    await ctx.conversation.enter(IdConversations.TakePillConversation);
  });

  bot.command(MainBotCommands.Count, async (ctx) => {
    await ctx.conversation.enter(IdConversations.CountPillConversation);
  });

  bot.command(MainBotCommands.Add, async (ctx) => {
    await ctx.conversation.enter(IdConversations.AddPillConversation);
  });

  bot.command(MainBotCommands.Edit, async (ctx) => {
    await ctx.conversation.enter(IdConversations.EditPillConversation);
  });

  console.log(`The server starting at port ${process.env.PORT}`);
  bot.start();
}
