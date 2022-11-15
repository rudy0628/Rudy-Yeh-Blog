import React, { useState, useEffect } from 'react';
import { Heart } from 'react-feather';
import { CodeBlock } from '../utils';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { getPostLikes } from '../../services';
import cx from 'classnames';

import useAuthStore from '../../store/authStore';

import { toast } from 'react-toastify';
import { TOAST_STYLE } from '../../utils';

interface IProps {
	source: MDXRemoteSerializeResult;
	slug: string;
}

const components = { CodeBlock };

const PostDetailContent = ({ source, slug }: IProps) => {
	const [likes, setLikes] = useState([]);
	const [isLiked, setIsLiked] = useState(false);
	const { userProfile }: any = useAuthStore();

	// if user Login or Logout in this page
	useEffect(() => {
		if (!userProfile) {
			setIsLiked(false);
		} else {
			const userLiked = !!likes.find(
				(like: any) => like.author.id === userProfile.id
			);
			setIsLiked(userLiked);
		}
	}, [userProfile]);

	// if user first visit this page
	useEffect(() => {
		const setLikesHandler = async () => {
			const likes = await getPostLikes(slug);
			if (userProfile) {
				const userLiked = !!likes.find(
					(like: any) => like.author.id === userProfile.id
				);
				setIsLiked(userLiked);
			}

			setLikes(likes || []);
		};

		setLikesHandler();
	}, []);

	const likeBtnHandler = async () => {
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

		const likes = await response.json();

		const userLiked = !!likes.find(
			(like: any) => like.author.id === userProfile.id
		);

		setIsLiked(userLiked);
		setLikes(likes);
	};

	return (
		<div className="w-full lg:w-[650px] px-4 mx-auto min-h-screen pb-32">
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
		</div>
	);
};

export default PostDetailContent;
