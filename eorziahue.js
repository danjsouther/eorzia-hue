const term = require('terminal-kit').terminal;
const art = require('ascii-art');

module.exports.EorziaHue = class EorziaHue {
	constructor(config, hueClient) {
		this.config = config;
		this.hue = hueClient;
		this.state = {
			hours: null,
			minutes: null,
			isDay: null
		};
		this.scenes = {
			day: null,
			night: null
		};
		this._interval = null;
	}

	async init() {
		await this.getScenes();
		clearInterval(this._interval);

		const ms = this.config.clock ? 100 : 1000

		this._interval = setInterval(() => this.controller(), ms);
	}

	async getScenes() {
		const scenes = await this.hue.scenes.getAll();
		this.scenes.day = scenes.filter( s => s.name == this.config.hue.scenes.day)[0];
		this.scenes.night = scenes.filter( s => s.name == this.config.hue.scenes.night)[0];

	}

	controller() {
		const now = this.time();
		if (now.isDay != this.state.isDay) {
			this.changeState(now);
		}

		if (this.config.clock && (now.hours != this.state.hours || now.minutes != this.state.minutes) ) {
			this.state.hours = now.hours;
			this.state.minutes = now.minutes
			this.displayClock();
		}
	}

	changeState(time) {
		if (time.isDay) {
			this.hue.scenes.recall(this.scenes.day);
		} else {
			this.hue.scenes.recall(this.scenes.night);
		}
		this.state.isDay = time.isDay;
	}

	displayClock() {
		term.clear();

		let mm = this.state.minutes;
		if (mm < 10) {
			mm = `0${mm}`
		}
		
		let h = this.state.hours;
		if (h == 0) {
			h = 12;
		} else if (h > 12) {
			h -= 12
		}

		const text = `${h}:${mm}`;
		art.font(text, this.config.font, (rendered) => {
			if (this.state.isDay) {
				term.yellow(rendered);
			} else {
				term.blue(rendered);
			}
		});
	}

	time() {
		const date = new Date(Math.round(new Date() * 3600 / 175))
		const hours = date.getUTCHours()
		const minutes = date.getUTCMinutes()
		return {
			hours: hours,
			minutes: minutes,
			isDay: 6 <= hours && hours < 18
		}
	}
}
