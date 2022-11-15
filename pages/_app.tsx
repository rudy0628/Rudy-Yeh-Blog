import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import Router from 'next/router';
import Nprogress from 'nprogress';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import { createOrGetUser } from '../utils';

import { useTheme } from 'next-themes';
import useAuthStore from '../store/authStore';

import { UserBtn } from '../components/utils';

import 'tailwindcss/tailwind.css';
import '../styles/globals.scss';
import 'nprogress/nprogress.css'; //styles of nprogress
import type { AppProps } from 'next/app';

// Route Events and NProgress
Nprogress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => Nprogress.start());
Router.events.on('routeChangeComplete', () => Nprogress.done());
Router.events.on('routeChangeError', () => Nprogress.done());

function MyApp({ Component, pageProps }: AppProps) {
	const [isSSR, setIsSSR] = useState(true);
	const { setTheme } = useTheme();
	const { addUser } = useAuthStore();

	// check login
	useEffect(() => {
		const token = window.localStorage.getItem('token');
		if (token) {
			createOrGetUser({ credential: token }, addUser);
		}
	}, []);

	// set theme
	useEffect(() => {
		const theme = window.localStorage.getItem('theme');
		if (!theme) {
			window.localStorage.setItem('theme', 'light');
			setTheme('light');
		} else {
			setTheme(theme);
		}
	}, []);

	// prevent SSR
	useEffect(() => {
		setIsSSR(false);
	}, []);

	if (isSSR) return;

	return (
		<GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
			<ThemeProvider attribute="class">
				<Component {...pageProps} />
				<UserBtn />
				<ToastContainer />
			</ThemeProvider>
		</GoogleOAuthProvider>
	);
}

export default MyApp;
