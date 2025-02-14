import { ICompany } from "@/types/company";
import { ILead, STAGE } from "@/types/lead";

export const MOCK_COMPANIES: ICompany[] = [
  {
    id: 1,
    name: "Amazon",
  },
  {
    id: 2,
    name: "Google",
  },
  {
    id: 3,
    name: "Microsoft",
  },
  {
    id: 4,
    name: "Apple",
  },
  {
    id: 5,
    name: "Facebook",
  },
  {
    id: 6,
    name: "Tesla",
  },
  {
    id: 7,
    name: "Netflix",
  },
  {
    id: 8,
    name: "Adobe",
  },
  {
    id: 9,
    name: "Intel",
  },
  {
    id: 10,
    name: "IBM",
  },
  {
    id: 11,
    name: "Oracle",
  },
];

export const MOCK_DATA: ILead[] = [
  {
    id: 1,
    name: "Christina Sanders MD",
    email: "jacksonjerry@example.com",
    company_name: "Mckee Ltd",
    company_id: 1,
    stage: STAGE.ENGAGED,
    engaged: true,
    last_contacted_at: new Date("05 Mar 2025"),
  },
  {
    id: 2,
    name: "Anthony Steele",
    email: "jrivera@example.com",
    company_name: "Gomez and Sons",
    company_id: 2,
    stage: STAGE.COMMITTED,
    engaged: true,
    last_contacted_at: new Date("05 Mar 2025"),
  },
  {
    id: 3,
    name: "Lori King",
    email: "kaylamcguire@example.org",
    company_name: "Hamilton, Sherman and Williams",
    company_id: 3,
    stage: STAGE.NEGOTIATION,
    engaged: false,
    last_contacted_at: null,
  },
  {
    id: 4,
    name: "Cynthia Thomas",
    email: "angela83@example.net",
    company_name: "Torres, Shelton and Arroyo",
    company_id: 4,
    stage: STAGE.COMMITTED,
    engaged: true,
    last_contacted_at: null,
  },
  {
    id: 5,
    name: "Gabriel Harrison",
    email: "geoffreysalazar@example.org",
    company_name: "Carter and Sons",
    company_id: 5,
    stage: STAGE.CLOSED,
    engaged: true,
    last_contacted_at: new Date("11 Jan 2025"),
  },
];
