import { ConversationContext, InternalContext } from "../../../types";
import { PillService } from "../../../services/pill/pill.service";

export class GetCountOfPillConversation {
  constructor(private readonly pillService: PillService) {}

  public async execute(
    _conversation: ConversationContext,
    ctx: InternalContext,
  ) {
    const { id: userId } = ctx.from!;
    await ctx.reply("Введите лекарство, которое вас интересует: ");
    const name = ctx.message?.text!;
    const pill = await this.pillService.getPillByName({ userId, name });

    if (pill) {
      const { allCount } = pill;
      await ctx.reply(`У тебя осталось ${allCount} лекарства`);
    } else {
      await ctx.reply("Я не смог найти выбранное лекарство в твоих лекарствах");
    }
  }
}
