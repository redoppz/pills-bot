import { Context } from "grammy";
import { UserService } from "../../../services/user/user.service";
import mainMenu from "../../menus/main.menu";

export class MainCommand {
  constructor(private readonly userService: UserService) {}

  public async start(ctx: Context) {
    const { from } = ctx;
    const {
      id: telegramId,
      first_name: firstName,
      last_name: lastName,
      username,
    } = from!;
    await ctx.reply(
      `Привет, ${firstName} ${lastName}. Мое предназначение - помочь тебе не забыть выпить таблетки!`,
      {
        reply_markup: mainMenu,
      },
    );

    await this.userService.createNewUser({
      firstName,
      lastName: lastName!,
      username: username!,
      telegramId,
    });
  }

  public async help(ctx: Context) {
    await ctx.reply("Тестовая заглушка для ответа на команду /help");
  }
}
