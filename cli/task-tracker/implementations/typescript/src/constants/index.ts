import * as process from "node:process";

export const ROOT = process.cwd();
export const STORE_DIR = `${ROOT}/.task-tracker`;
export const STORE_PATH = `${STORE_DIR}/tasks.json`;