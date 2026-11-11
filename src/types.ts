export type OfferType = "planner" | "prompt" | null;

export interface UnlockState {
  planner: boolean;
  prompt: boolean;
}

export interface PolicyModalState {
  isOpen: boolean;
  title: string;
  content: string;
}

export interface Offer {
  offerid: number;
  name: string;
  name_short: string;
  description: string;
  adcopy: string;
  picture: string;
  payout: string;
  country: string;
  device: string;
  link: string;
  epc: string;
}
