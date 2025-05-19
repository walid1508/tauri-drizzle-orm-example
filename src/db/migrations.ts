import m1 from "../../../src-tauri/migrations/0000_lying_shadow_king.sql?raw";

export const migrations = [
  {
    name: "init",
    sql: m1,
  },
];
