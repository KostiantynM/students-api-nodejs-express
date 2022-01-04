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
		exitOnError: false,
	});
};

module.exports = {
	init: (config) => {
		if (!instance) init(config);
		return instance;
	},
	initWithContext: (ctx) => {
		if (!instance) init();
		
		// logging levels { 
		// 	error: 0, 
		// 	warn: 1, 
		// 	info: 2, 
		// 	http: 3,
		// 	verbose: 4, 
		// 	debug: 5, 
		// 	silly: 6 
		//   }
		
		const buildLogger = (ctx) => Object.keys(instance.levels).reduce((accum, key) => {
			accum[key] = (msg, meta = {}) => instance.log(key, msg, Object.assign(meta, {ctx}));
			return accum;
		}, {});
		return buildLogger(ctx);
	}
};