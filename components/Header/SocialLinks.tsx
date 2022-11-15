import React from 'react';
import { LineIcon } from './';
import { Facebook, GitHub, Globe, Instagram } from 'react-feather';
import { useTheme } from 'next-themes';
import { DayNightBtn } from '../utils';

interface IProps {
	color?: string;
}

const SocialLinks = ({ color }: IProps) => {
	const { theme } = useTheme();

	return (
		<div className="flex lg:mt-4 opacity-70 items-center">
			<a
				className="transition hover:text-zinc-500"
				href="https://rudyyeh.dev/"
				target="_blank"
				rel="noreferrer"
				aria-label="RudyYeh Portfolio"
			>
				<Globe size={18} color={color} />
			</a>
			<a
				className="ml-4 transition hover:text-zinc-500"
				href="https://www.facebook.com/s3352250"
				target="_blank"
				rel="noreferrer"
				aria-label="Facebook"
			>
				<Facebook size={18} color={color} />
			</a>
			<a
				className="ml-4 transition hover:text-zinc-500"
				href="https://github.com/rudy0628"
				target="_blank"
				rel="noreferrer"
				aria-label="GitHub"
			>
				<GitHub size={18} color={color} />
			</a>
			<a
				className="ml-4 transition hover:text-zinc-500"
				href="https://www.instagram.com/ya.0628/"
				target="_blank"
				rel="noreferrer"
				aria-label="Instagram"
			>
				<Instagram size={18} color={color} />
			</a>
			<a
				className="ml-4 transition hover:text-zinc-500"
				href="https://line.me/ti/p/ZO_picyri2"
				target="_blank"
				rel="noreferrer"
				aria-label="Line"
			>
				<LineIcon
					size={20}
					color={color ? color : theme === 'dark' ? 'white' : 'dark'}
				/>
			</a>
			<DayNightBtn />
		</div>
	);
};

export default SocialLinks;
