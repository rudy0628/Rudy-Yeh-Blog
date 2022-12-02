import React from 'react';
import moment from 'moment';
import { IPostDetail } from '../../type';

interface IProps {
	post: IPostDetail;
}

const PostDetailHeader = ({ post }: IProps) => {
	//
	return (
		<div className="w-full lg:h-[100vh] h-[80vh] overflow-hidden relative flex justify-center">
			{/* background image */}
			<img
				src={post.image}
				alt={post.slug}
				className="absolute top-0 w-full h-full object-cover bg-zinc-500"
			/>
			{/* background filter */}
			<div className="w-full h-full absolute top-0 right-0 bg-black bg-opacity-60" />
			{/* Header title */}
			<div className="w-full px-4 lg:w-[650px] mx-auto absolute lg:bottom-24 bottom-12">
				{/* title text */}
				<p
					className="text-white text-3xl lg:text-5xl font-extrabold"
					style={{ lineHeight: 1.5 }}
				>
					{post.title}
				</p>
				{/* categories */}
				<div className="flex gap-2 mt-4">
					{post.categories.map(category => (
						<span
							key={category.slug}
							className="rounded-full py-1 px-2 border-2 text-xs tracking-wide font-extrabold text-white opacity-80"
						>
							{category.name}
						</span>
					))}
				</div>
				{/* author and created date */}
				<div className="flex flex-row align-bottom mt-4">
					<img
						src={post.author.photo}
						alt={post.author.name}
						className="rounded-full h-8 w-8 mr-4"
					/>
					<p className="text-white lg:text-xl font-extrabold opacity-80">
						{post.author.name}
					</p>
					<p className="text-white lg:text-xl ml-2 lg:ml-8 opacity-60">
						{moment(post.createdAt).format('YYYY-MM-DD')}
					</p>
				</div>
			</div>
		</div>
	);
};

export default PostDetailHeader;
