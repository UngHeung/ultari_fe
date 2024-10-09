export const PROTOCOL = process.env.NEXT_PUBLIC_DB_PROTOCOL;
export const HOSTNAME = process.env.NEXT_PUBLIC_DB_HOST;
export const PORT = process.env.NEXT_PUBLIC_DB_PORT;
export const BASE_URL = `${PROTOCOL}://${HOSTNAME}:${PORT}`;
