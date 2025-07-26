// Production logging configuration
const isProduction = process.env.NODE_ENV === 'production';

const loggerConfig = {
  level: isProduction ? 'warn' : 'info',
  format: isProduction ? 'json' : 'dev',
  transports: {
    console: {
      handleExceptions: true,
      json: isProduction,
      colorize: !isProduction
    },
    file: isProduction ? {
      filename: '/app/logs/app.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false
    } : null
  },
  exitOnError: false
};

module.exports = loggerConfig;
