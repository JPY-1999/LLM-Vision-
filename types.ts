export enum StageId {
  INTRO = 0,
  PATCHING = 1,
  ENCODER_CLIP = 2,
  PROJECTION = 3,
  TOKENS = 4,
  INFERENCE = 5
}

export interface ContentStep {
  id: StageId;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}