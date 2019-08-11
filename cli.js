(async () => {
	const fs = require('fs');
	const commandLineArgs = require('command-line-args');
	const commandLineUsage = require('command-line-usage');
	const art = require('ascii-art');
	const { EorziaHue, HueClient } = require('./main');
	
	const optionDefinitions = [
		{
			name: 'config',
			alias: 'c',
			type: String,
			defaultValue: 'config.json',
		},
		{
			name: 'clock',
			alias: 't',
			type: Boolean,
			description: "Display an Eorzia clock in the console."
		},
		{
			name: 'font',
			alias: 'f',
			type: String,
			defaultValue: 'doh',
			description: "Figfont font. [doh|big|lean]. Default: doh"
		},
		{
			name: 'help',
			alias: 'h',
			type: Boolean,
			description: "Display this help text"
		}
	];

	const usage = commandLineUsage([
		{
			header: 'Eorzia Hue Day/Night Sync',
			content: 'Sync lights with Eorzia day/night cycle. Day and Night scenes need to be configured seperately using your Hue app.'
		},
		{
			header: 'Options',
			optionList: optionDefinitions
		}
	]);
	const options = commandLineArgs(optionDefinitions);

	if (options.help) {
		console.log(usage)
		process.exit(0);
	}

	const config = JSON.parse(fs.readFileSync(options.config))
	config.clock = options.clock;
	config.font = options.font;
	config.refresh = options.refresh;

	art.Figlet.fontPath = config.fontPath;

	const hueClient = new HueClient(config.hue)
	const eorziaHue = new EorziaHue(config, hueClient);
	eorziaHue.init()
})();

