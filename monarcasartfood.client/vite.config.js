import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import fs from 'fs';
import child_process from 'child_process';
import { env } from 'process';

import react from '@vitejs/plugin-react';
import { createLogger, defineConfig } from 'vite';

// --------------------------- CONFIGS DEL PRIMER ARCHIVO ---------------------------

const configHorizonsViteErrorHandler = `...`; // igual al original
const configHorizonsRuntimeErrorHandler = `...`;
const configHorizonsConsoleErrroHandler = `...`;
const configWindowFetchMonkeyPatch = `...`;

const addTransformIndexHtml = {
	name: 'add-transform-index-html',
	transformIndexHtml(html) {
		return {
			html,
			tags: [
				{
					tag: 'script',
					attrs: { type: 'module' },
					children: configHorizonsRuntimeErrorHandler,
					injectTo: 'head',
				},
				{
					tag: 'script',
					attrs: { type: 'module' },
					children: configHorizonsViteErrorHandler,
					injectTo: 'head',
				},
				{
					tag: 'script',
					attrs: { type: 'module' },
					children: configHorizonsConsoleErrroHandler,
					injectTo: 'head',
				},
				{
					tag: 'script',
					attrs: { type: 'module' },
					children: configWindowFetchMonkeyPatch,
					injectTo: 'head',
				},
			],
		};
	},
};

console.warn = () => { };

const logger = createLogger();
const loggerError = logger.error;

logger.error = (msg, options) => {
	if (options?.error?.toString().includes('CssSyntaxError: [postcss]')) {
		return;
	}
	loggerError(msg, options);
};

// --------------------------- CONFIGS DEL SEGUNDO ARCHIVO (HTTPS + PROXY) ---------------------------

const baseFolder =
	env.APPDATA !== undefined && env.APPDATA !== ''
		? `${env.APPDATA}/ASP.NET/https`
		: `${env.HOME}/.aspnet/https`;

const certificateName = "monarcasartfood.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(baseFolder)) {
	fs.mkdirSync(baseFolder, { recursive: true });
}

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
	if (
		0 !==
		child_process.spawnSync(
			'dotnet',
			[
				'dev-certs',
				'https',
				'--export-path',
				certFilePath,
				'--format',
				'Pem',
				'--no-password',
			],
			{ stdio: 'inherit' }
		).status
	) {
		throw new Error('Could not create certificate.');
	}
}

const target = env.ASPNETCORE_HTTPS_PORT
	? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
	: env.ASPNETCORE_URLS
		? env.ASPNETCORE_URLS.split(';')[0]
		: 'https://localhost:7105';

// --------------------------- CONFIG VITE FINAL ---------------------------

export default defineConfig({
	customLogger: logger,
	plugins: [react(), addTransformIndexHtml],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
		extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
	},
	server: {
		cors: true,
		headers: {
			'Cross-Origin-Embedder-Policy': 'credentialless',
		},
		allowedHosts: true,
		port: parseInt(env.DEV_SERVER_PORT || '51970'),
		https: {
			key: fs.readFileSync(keyFilePath),
			cert: fs.readFileSync(certFilePath),
		},
		proxy: {
			'^/weatherforecast': {
				target,
				secure: false,
			},
		},
	},
});
