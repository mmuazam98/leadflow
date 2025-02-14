import { IMeta } from "../../types/api";

export const getInitials = (name: string) => {
  const names = name.split(" ");
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
};

export const getStartAndEnd = (meta: IMeta | undefined) => {
  if (!meta) return "0";
  const totalCount = meta?.total_count || 0;
  const limit = meta?.limit || 10;
  const offset = meta?.offset || 0;

  const start = totalCount === 0 ? 0 : offset + 1;
  const end = Math.min(offset + limit, totalCount);

  return `${start}-${end}`;
};
