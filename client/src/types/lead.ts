export const STAGE = {
  PROSPECT: "PROSPECT",
  ENGAGED: "ENGAGED",
  NEGOTIATION: "NEGOTIATION",
  COMMITTED: "COMMITTED",
  CLOSED: "CLOSED",
} as const;

export type StageType = (typeof STAGE)[keyof typeof STAGE];

export const STAGE_LEVELS: Record<StageType, number> = {
  PROSPECT: 1,
  ENGAGED: 2,
  NEGOTIATION: 3,
  COMMITTED: 4,
  CLOSED: 5,
};

export interface ILead {
  id?: number;
  name: string;
  email: string;
  company_id: number | null;
  company_name: string;
  stage: StageType;
  last_contacted_at: string | null;
  engaged: boolean;
}
