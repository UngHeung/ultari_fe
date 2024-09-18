import pino from 'pino';

const logger = {
  trace: pino({ level: 'trace' }).trace,
  debug: pino({ level: 'debug' }).debug,
  info: pino({ level: 'info' }).info,
  warn: pino({ level: 'warn' }).warn,
  error: pino({ level: 'error' }).error,
  fatal: pino({ level: 'fatal' }).fatal,
};

export default logger;
