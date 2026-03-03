import { ConversationContext, InternalContext } from "../../../types";
import { PillService } from "../../../services/pill/pill.service";
import { inject, injectable, registry } from "tsyringe";

enum UserChoice {
  Count = "Количество лекарства",
  Time = "Время приема",
}

@injectable()
@registry([
  {
    token: "PillService",
    useClass: PillService,
  },
])
export class EditOldPillConversation {
  constructor(
    @inject("PillService") public readonly pillService: PillService,
  ) {}

  public async execute(
    conversation: ConversationContext,
    ctx: InternalContext,
  ) {
    const id = ctx.from?.id!;

    await ctx.reply("Выбери лекарство: ");
    const { message: nameMessage } = await conversation.wait();
    const pillName = nameMessage?.text!;

    await ctx.reply("Что редактируем?");
    const { message: userChoiceMessage } = await conversation.wait();
    const userChoice = userChoiceMessage?.text!;

    if (userChoice === UserChoice.Time) {
      await ctx.reply("Выбери сколько раз в день ты будешь его пить");
      const { message: countPerDayMessage } = await conversation.wait();
      const countPerDay = countPerDayMessage?.text!;

      await this.pillService.editOldPill({ id, name: pillName, countPerDay });

      await ctx.reply(`Ты будешь пить лекарство ${pillName} раз в день`);
    } else {
      await ctx.reply("Внеси количество лекарства");
      const { message: countMessage } = await conversation.wait();
      const allCount = countMessage?.text!;

      await this.pillService.editOldPill({ id, name: pillName, allCount });

      await ctx.reply(`Готово, внес. У тебя ${allCount} лекарства`);
    }
  }
}
