
export enum ToolType {
  HOME = 'HOME',
  QR_GEN = 'QR_GEN',
  RANDOM_PICKER = 'RANDOM_PICKER',
  STOPWATCH = 'STOPWATCH',
  DICE = 'DICE'
}

export interface PickedResult {
  name: string;
  time: Date;
}
