# Eorzia Hue

Sync day/night cycle to philips hue scenes.

## Setup

Put the ip address of your Hue bridge, and valid username in the `config.json` file.

``` json
{
	"hue": {
		"host": "your.bridge.ip.address",
		"username": "hue-generated-username",
		"scenes": {
			"day": "FF XIV Day",
			"night": "FF XIV Day"
		}
	},
	"fontPath": "figfonts/"
}
```

## Usage

```
node cli.js
```

```
node cli.js --clock --font big
```

## 

### Dependencies

- [huejay](https://github.com/sqmk/huejay)
- [ascii-art](https://github.com/khrome/ascii-art)
- [terminal-kit](https://github.com/cronvel/terminal-kit)
- [command-line-args](https://github.com/75lb/command-line-args)
- [command-line-usage](https://github.com/75lb/command-line-usage)