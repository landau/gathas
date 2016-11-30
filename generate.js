#!/usr/bin/env node

'use strict';

const showdown = require('showdown');
const converter = new showdown.Converter();
const fs = require('fs');
const top = fs.readFileSync('./top.html', 'utf8');
const bottom = fs.readFileSync('./bottom.html', 'utf8');
const template = fs.readFileSync('./template.html', 'utf8');

process.stdin.setEncoding('utf8');

let markdown = '';
process.stdin.on('data', chunk => markdown += chunk);

process.stdin.on('end', () => {

	let output = markdown.match(/(#####\s.+[^#]+)/g)
		.map(line => line.split('\n'))
		.map((split, i) => {
			const hed = converter.makeHtml(split[0]);
			const body = converter.makeHtml(split.slice(1).join('\n'));
			const color = i % 2 === 0 ? 'light' : 'dark';
			return template.replace('{{color}}', color)
				.replace('{{hed}}', hed)
				.replace('{{body}}', body);
		});


	console.log(top + output.join('\n') + bottom);
});

