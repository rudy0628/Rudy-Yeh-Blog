import React from 'react';
import Link from 'next/link';
import { SocialLinks } from './';

const Header = () => {
	return (
		<div className="my-4 lg:mt-12">
			{/* Banner */}
			<Link href="/" scroll>
				<div className="font-extrabold text-xl lg:text-3xl mb-4 lg:mb-0 cursor-pointer flex flex-row lg:flex-col items-baseline">
					<p className="mr-2">Rudy Yeh</p>
					<p className="text-lg text-[#90caf9]">Blog</p>
				</div>
			</Link>
			{/* social links */}
			<SocialLinks />
		</div>
	);
};

export default Header;
