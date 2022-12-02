import React from 'react';
import { SocialLinks } from '../Header';

interface IProps {
	author: {
		bio: string;
		name: string;
		id: string;
		photo: string;
	};
}

const PostAboutUser = ({ author }: IProps) => {
	return (
		<div className="w-full pb-32 pt-16 bg-zinc-100 dark:bg-zinc-800">
			<div className="w-full lg:w-[650px] px-4 mx-auto">
				<div className="flex items-center mt-12 flex-col md:flex-row">
					<img
						src={author.photo}
						alt={author.name}
						className="w-24 h-24 rounded-full"
					/>
					<div className="ml-0 mt-12 md:ml-12 md:mt-0">
						<p className="font-extrabold opacity-60 mb-4 text-center md:text-left">
							關於作者
						</p>
						<p className="font-extrabold text-2xl text-center md:text-left">
							{author.name}
						</p>
						<p className="mt-6 mb-12 opacity-70 text-center md:text-left">
							{author.bio}
						</p>
						<div className="flex justify-center md:justify-start">
							<SocialLinks />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostAboutUser;
