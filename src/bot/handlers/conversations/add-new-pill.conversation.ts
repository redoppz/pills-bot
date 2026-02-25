import { ConversationContext, InternalContext, PillForm } from "../../../types";
import { PillService } from "../../../services/pill/pill.service";

export class AddNewPillConversation {
  constructor(private readonly pillService: PillService) {}

  public async execute(
    conversation: ConversationContext,
    ctx: InternalContext,
  ) {
    const userId = ctx.from?.id!;

    await ctx.reply("Напиши название в чат");
    const { message: nameMessage } = await conversation.wait();

    await ctx.reply("Напиши количество лекарства");
    const { message: countMessage } = await conversation.wait();

    await ctx.reply("Выбери сколько раз в день, ты будешь его пить");
    const { message: countPerDayMessage } = await conversation.wait();

    await ctx.reply("Выбери форму лекарства");
    const { message: formMessage } = await conversation.wait();

    const pillName = nameMessage?.text;
    const allCount = countMessage?.text;
    const countPerDay = countPerDayMessage?.text;
    const form = formMessage?.text;

    await this.pillService.addNewPill({
      userId,
      name: pillName!,
      allCount: allCount!,
      countPerDay: countPerDay!,
      form: form! as PillForm,
    });
  }
}
