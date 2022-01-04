const winston = require('winston');

let instance;
const loggerTransports = [];

const init = (config) => {
	const defaultConsoleOptions = {
		level: 'info',
		json: true,
		type: 'json',
		stringify: options => JSON.stringify(options), // you can define the lenth of payload here
		timestamp: true,
	};
	Object.assign(defaultConsoleOptions, config || {});
	loggerTransports.push(new (winston.transports.Console)(defaultConsoleOptions));
	
	instance = winston.createLogger({
	transports: loggerTransports,
	exitOnError: !!process.env.LOGGER_EXCEPTION_EXIT,
	});
};

module.exports = {
	init: (config) => {
		if (!instance) init(config);
		return instance;
	}
};