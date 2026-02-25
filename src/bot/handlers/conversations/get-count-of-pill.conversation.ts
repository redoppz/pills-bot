import { ConversationContext, InternalContext } from "../../../types";
import { PillService } from "../../../services/pill/pill.service";

export class GetCountOfPillConversation {
  constructor(private readonly pillService: PillService) {}

  public async execute(
    conversation: ConversationContext,
    ctx: InternalContext,
  ) {
    const { id: userId } = ctx.from!;
    await ctx.reply("Введите лекарство, которое вас интересует: ");
    const { message } = await conversation.wait();
    const pillName = message?.text!;

    const pills = await this.pillService.getAllPills({
      userId,
    });
    const foundedPill = pills.find((pill) => pill.name === pillName);

    if (Boolean(foundedPill)) {
      const { allCount } = foundedPill!;
      await ctx.reply(`У тебя осталось ${allCount} лекарства`);
    } else {
      await ctx.reply(
        `Я не смог найти выбранное лекарство в твоих заметках. Твои лекарства - ${pills.map((pill) => pill.name).join(", ")}`,
      );
    }
  }
}
