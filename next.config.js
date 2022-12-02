/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['react-syntax-highlighter']);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
	withTM({
		reactStrictMode: true,
		images: {
			domains: ['media.graphassets.com', 'lh3.googleusercontent.com'],
		},
	})
);
