import React from 'react';
import { IPost } from '../../type';
import Link from 'next/link';
import Image from 'next/image';
import cx from 'classnames';
import moment from 'moment';

interface IProps {
	imageClassName?: string;
	post: IPost;
}

const PostCard = ({ imageClassName, post }: IProps) => {
	const takeOutPost = post.node;

	return (
		<Link href={`/posts/${takeOutPost.slug}`} scroll>
			<div className="w-full group transition-all duration-1000">
				{/* image */}
				<div
					className={cx(
						imageClassName,
						'w-full object-cover overflow-hidden lg:group-hover:scale-105 duration-500 rounded-lg cursor-pointer shadow-lg relative'
					)}
				>
					<Image
						layout="fill"
						objectFit="cover"
						src={takeOutPost.image.url}
						alt={takeOutPost.title}
					/>
				</div>
				{/* title */}
				<p className="font-extrabold text-2xl mt-6 cursor-pointer group-hover:translate-x-2 duration-1000">
					{takeOutPost.title}
				</p>
				{/* created date */}
				<p className="text-[#90caf9] font-extrabold duration-700 mt-2 cursor-pointer group-hover:translate-x-4 transition-all">
					{moment(takeOutPost.createdAt).format('YYYY-MM-DD')}
				</p>
				{/* excerpt */}
				<p className="lg:opacity-40 mt-4 cursor-pointer group-hover:opacity-100 transition-all">
					{takeOutPost.excerpt}
				</p>
			</div>
		</Link>
	);
};

export default PostCard;
