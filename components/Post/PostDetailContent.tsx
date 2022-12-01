import React, { useState, useEffect, useCallback, memo } from 'react';
import { Heart } from 'react-feather';
import { CodeBlock, NoteBlock, Question } from '../utils';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { getPostLikes } from '../../services';
import cx from 'classnames';
import { ChevronLeft, ChevronRight } from 'react-feather';
import Link from 'next/link';

import useAuthStore from '../../store/authStore';

import { toast } from 'react-toastify';
import { TOAST_STYLE } from '../../utils';

interface IProps {
	source: MDXRemoteSerializeResult;
	slug: string;
	prevPost: {
		slug: string;
		title: string;
	};
	nextPost: {
		slug: string;
		title: string;
	};
}

const components = { CodeBlock, NoteBlock, Question };

const PostDetailContent = ({ source, slug, prevPost, nextPost }: IProps) => {
	const [likes, setLikes] = useState([]);
	const [isLiked, setIsLiked] = useState(false);
	const { userProfile }: any = useAuthStore();

	useEffect(() => {
		const setLikesHandler = async () => {
			const likes = await getPostLikes(slug);

			if (userProfile) {
				const userLiked = !!likes.find(
					(like: any) => like.author.id === userProfile.id
				);
				setIsLiked(userLiked);
			} else {
				setIsLiked(false);
			}

			setLikes(likes || []);
		};

		setLikesHandler();
	}, [userProfile]);

	const likeBtnHandler = useCallback(async () => {
		if (!userProfile) {
			toast.error('請登入後再進行按讚動作！', TOAST_STYLE);
			return;
		}

		const response = await fetch(`/api/${slug}/like`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: userProfile.id,
			}),
		});

		const data = await response.json();

		setIsLiked(data.isLiked);
		setLikes(data.likes);
	}, []);

	return (
		<div className="w-full lg:w-[650px] px-4 mx-auto pb-32">
			{/* content */}
			<div id="article" className="my-16">
				<MDXRemote {...source} components={components} />
			</div>
			{/* Likes */}
			<div className="flex items-center">
				<button
					className="text-[#90caf9] transition duration-500"
					onClick={likeBtnHandler}
					type="button"
					aria-label="like"
				>
					<Heart
						className={cx(
							'hover:fill-[#90caf9]',
							userProfile && isLiked && 'fill-[#90caf9]'
						)}
					/>
				</button>
				<p className="text-[#90caf9] ml-4 mr-6">{likes.length || 0}</p>
				<div className="h-6 flex">
					{likes
						.slice(0, 6)
						.reverse()
						.map((like: any, index) => (
							<img
								key={index}
								src={like.author.photo.url}
								alt={like.author.name}
								className={cx(
									'h-6 w-6 rounded-full border-[1px] border-gray-200',
									index > 0 && 'ml-[-4px]'
								)}
							/>
						))}
				</div>
			</div>
			{/* prev and next post */}
			{(prevPost || nextPost) && (
				<div className="flex gap-4 mt-16 md:flex-row flex-col">
					{/* prev post */}
					{prevPost && (
						<Link href={`/posts/${prevPost.slug}`} className="flex-1">
							<div className="border-[1px] rounded-lg p-3 flex gap-2 justify-start items-center group hover:border-[#90caf9] transition duration-300">
								<p>
									<ChevronLeft />
								</p>
								<div className="flex flex-col gap-2">
									<p className="font-extrabold text-sm text-left">上一篇</p>
									<p className="group-hover:text-[#90caf9] transition duration-300">
										{prevPost.title}
									</p>
								</div>
							</div>
						</Link>
					)}
					{/* nextPost */}
					{nextPost && (
						<Link href={`/posts/${nextPost.slug}`} className="flex-1">
							<div className="border-[1px] rounded-lg p-3 flex gap-2 justify-end items-center group hover:border-[#90caf9] transition duration-300">
								<div className="flex flex-col gap-2">
									<p className="font-extrabold text-sm text-right">下一篇</p>
									<p className="group-hover:text-[#90caf9] transition duration-300">
										{nextPost.title}
									</p>
								</div>
								<p>
									<ChevronRight />
								</p>
							</div>
						</Link>
					)}
				</div>
			)}
		</div>
	);
};

export default memo(PostDetailContent);
