import React from 'react';
import { Sun, Moon } from 'react-feather';
import { useTheme } from 'next-themes';

const DayNightBtn = () => {
	const { theme, setTheme } = useTheme();

	const changeThemeHandler = () => {
		if (theme === 'dark') {
			setTheme('light');
			window.localStorage.setItem('theme', 'light');
		} else if (theme === 'light') {
			setTheme('dark');
			window.localStorage.setItem('theme', 'dark');
		}
	};

	return (
		<button
			className="ml-4 dark:bg-gray-700 bg-gray-100 p-[8px] rounded-md"
			onClick={changeThemeHandler}
			type="button"
			aria-label="themeSwitch"
		>
			{theme === 'dark' ? <Moon color="#FEFCD7" /> : <Sun color="#e6d170" />}
		</button>
	);
};

export default DayNightBtn;
