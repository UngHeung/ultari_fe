import pino, { Logger } from 'pino';

export type LoggerType =
  | 'trace'
  | 'debug'
  | 'info'
  | 'warn'
  | 'error'
  | 'fatal';

const logger = {
  trace: getLogger('trace').trace,
  debug: getLogger('debug').debug,
  info: getLogger('info').info,
  warn: getLogger('warn').warn,
  error: getLogger('error').error,
  fatal: getLogger('fatal').fatal,
};

function getLogger(level: LoggerType): Logger {
  return pino({
    level,
  });
}

export default logger;
