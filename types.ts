
export enum Stage {
  INTRO = 'INTRO',
  GIFT = 'GIFT',
  LOVE_ME = 'LOVE_ME',
  SWEET_QUESTIONS = 'SWEET_QUESTIONS',
  FINAL = 'FINAL'
}

export interface Question {
  text: string;
  image: string;
}
