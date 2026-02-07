import type { Context } from "grammy";
import mainMenu from "../../menus/main.menu";

export default async (ctx: Context) => {
  const { from } = ctx;
  const { first_name: firstName, last_name: lastName } = from!;
  await ctx.reply(
    `Привет, ${firstName} ${lastName}. Мое предназначение - помочь тебе не забыть выпить таблетки!`,
    {
      reply_markup: mainMenu,
    },
  );
};
