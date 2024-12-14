import { Bot } from 'grammy';
import { configDotenv } from 'dotenv';

configDotenv();

export default async function () {
  const bot = new Bot(process.env.BOT_TOKEN!);

  await bot.api.setMyCommands([
    { command: 'start', description: 'Запустить бота' },
    { command: 'take', description: 'Внести прием лекарства' },
    { command: 'count', description: 'Посмотреть сколько лекарства осталось' },
    { command: 'add', description: 'Добавить новое лекарство' },
    { command: 'edit', description: 'Редактировать старое лекарство' },
  ]);

  bot.command('start', async (ctx) => {
    const username = ctx.message?.from.username;
    await ctx.reply(`Hello, ${username}`);
  });

  bot.command('take', async (ctx) => {
    await ctx.reply('Напиши название лекарства');
    bot.hears('ping', async (ctx) => {
      await ctx.reply('pong', {
        reply_parameters: { message_id: ctx.msg.message_id },
      });
    });
  });

  bot.start();
}
