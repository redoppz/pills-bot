import { PillService } from "../../../services/pill/pill.service";
import { ConversationContext, InternalContext } from "../../../types";

export class TakePillConversation {
  constructor(private readonly pillService: PillService) {}

  public async execute(
    conversation: ConversationContext,
    ctx: InternalContext,
  ) {
    await ctx.reply("Введите лекарство, которое вас интересует: ");
    const { message: nameMessage } = await conversation.wait();
    const pillName = nameMessage?.text!;

    this.pillService.takePill({ name: pillName });
  }
}
