import React from 'react';
import cx from 'classnames';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { SocialLinks } from '../Header';

interface IProps {
	shouldHideWhiteLogo: boolean;
}

const PostDetailNav = ({ shouldHideWhiteLogo }: IProps) => {
	const { theme } = useTheme();

	return (
		<div
			className={cx(
				'w-full lg:w-64 fixed top-0 px-4 flex flex-row justify-between items-center lg:items-start lg:flex-col py-2 lg:p-6 bg-white dark:bg-gray-800 dark:lg:bg-opacity-0 lg:bg-opacity-0 z-40 transition',
				!shouldHideWhiteLogo && 'bg-opacity-0 dark:bg-opacity-0'
			)}
		>
			{/* Banner */}
			<Link href="/" scroll>
				<div className="font-extrabold text-xl lg:text-3xl mb-0 cursor-pointer flex flex-row lg:flex-col items-baseline">
					<p
						className={cx(
							'mr-2 z-50 transition duration-1000',
							theme === 'dark'
								? 'text-white'
								: shouldHideWhiteLogo
								? 'text-black'
								: 'text-white'
						)}
					>
						Rudy Yeh
					</p>
					<p className="text-lg text-[#90caf9]">Blog</p>
				</div>
			</Link>
			{/* Social Link */}
			<SocialLinks
				color={
					theme === 'dark' ? 'white' : shouldHideWhiteLogo ? 'black' : 'white'
				}
			/>
		</div>
	);
};

export default PostDetailNav;
