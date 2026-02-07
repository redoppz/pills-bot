import { ConversationContext, InternalContext } from "../../../types";
import { PillService } from "../../../services/pill/pill.service";

export class AddNewPillConversation {
  constructor(private readonly pillService: PillService) {}

  public async execute(
    _conversation: ConversationContext,
    ctx: InternalContext,
  ) {
    ctx.reply("Напиши название в чат");
    const pillName = ctx.message?.text!;
    ctx.reply("Напиши количество лекарства");
    const allCount = ctx.message?.text!;
    ctx.reply("Выбери сколько раз в день, ты будешь его пить");
    const countPerDay = ctx.message?.text!;

    await this.pillService.addNewPill({
      name: pillName,
      allCount,
      countPerDay,
    });
  }
}
