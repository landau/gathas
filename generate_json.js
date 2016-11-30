#!/usr/bin/env node

'use strict';

const showdown = require('showdown');
const converter = new showdown.Converter();

process.stdin.setEncoding('utf8');

let markdown = '';
process.stdin.on('data', chunk => markdown += chunk);

process.stdin.on('end', () => {

	let output = markdown.match(/(#####\s.+[^#]+)/g)
		.map(line => line.split('\n'))
		.map(split => ({
			hed: converter.makeHtml(split[0]),
			body: converter.makeHtml(split.slice(1).join('\n'))
		}));

	console.log(JSON.stringify(output));
});

