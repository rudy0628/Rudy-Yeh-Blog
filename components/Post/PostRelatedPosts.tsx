import React, { useEffect, useState, memo } from 'react';
import Link from 'next/link';
import { getRelatedPosts } from '../../services';
import { IRelatedPost } from '../../type';
import moment from 'moment';
import { NoResult } from '../utils';

interface IProps {
	categories: {
		name: string;
		slug: string;
	}[];
	slug: string;
}

const PostRelatedPosts = ({ categories, slug }: IProps) => {
	const [relatedPosts, setRelatedPosts] = useState([]);

	useEffect(() => {
		const formatCategories = categories.map(category => category.slug);
		getRelatedPosts(formatCategories, slug).then(posts => {
			setRelatedPosts(posts);
		});
	}, [categories, slug]);

	return (
		<div className="w-full pb-32 pt-16 bg-zinc-200 dark:bg-zinc-700">
			<div className="w-full lg:w-[650px] px-4 mx-auto">
				<p className="mb-16 font-extrabold text-center md:text-left">
					閱讀更多
				</p>
				{relatedPosts &&
					relatedPosts.length > 0 &&
					relatedPosts.map((post: IRelatedPost, index: number) => (
						<Link key={index} href={`/posts/${post.slug}`}>
							<div className="mb-12 flex flex-col md:flex-row cursor-pointer group">
								<img
									src={post.image}
									alt={post.title}
									className="w-full md:w-48 h-48 object-cover mr-8 rounded-lg group-hover:scale-105 transition-all duration-500"
								/>
								<div className="flex-1 mt-4 md:mt-0">
									<p className="font-extrabold text-xl group-hover:translate-x-2 transition-all duration-700">
										{post.title}
									</p>
									<p className="opacity-70 my-4 group-hover:translate-x-4 transition-all duration-1000 text-[#90caf9] font-extrabold">
										{moment(post.createdAt).format('YYYY-MM-DD')}
									</p>
									<p className="lg:opacity-40 group-hover:opacity-100 transition-all">
										{post.excerpt}
									</p>
								</div>
							</div>
						</Link>
					))}
				{!relatedPosts ||
					(relatedPosts.length === 0 && <NoResult text="暫時沒有相關文章！" />)}
			</div>
		</div>
	);
};

export default memo(PostRelatedPosts);
