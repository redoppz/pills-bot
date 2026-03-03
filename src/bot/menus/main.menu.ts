import { Keyboard } from "grammy";

const values = [
  "Внести прием лекарства",
  "Посмотреть сколько лекарства осталось",
  "Добавить новое лекарство",
  "Редактировать старое лекарство",
];
const rows = values.map((label) => Keyboard.text(label));

export const mainMenu = Keyboard.from([rows]);
