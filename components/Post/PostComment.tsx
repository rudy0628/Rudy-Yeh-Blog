import React, { useEffect, useState } from 'react';
import { Trash } from 'react-feather';
import moment from 'moment';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { Dialog } from '../utils';
import defaultAvatar from '../../assets/image/defaultAvatar.png';

import useAuthStore from '../../store/authStore';

import { IComment } from '../../type';

interface IProps {
	comment: IComment;
	floor: number;
	slug: string;
	setComments: React.Dispatch<React.SetStateAction<never[]>>;
}

const PostComment = ({ comment, floor, slug, setComments }: IProps) => {
	const [source, setSource] = useState<MDXRemoteSerializeResult>();
	const [dialogIsOpen, setDialogIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { userProfile }: any = useAuthStore();

	useEffect(() => {
		serialize(comment.comment).then(mdxSource => {
			setSource(mdxSource);
		});
	}, []);

	const deleteCommentHandler = async () => {
		setIsLoading(true);
		const response = await fetch(`/api/${slug}/comment`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: comment.id,
			}),
		});

		const data = await response.json();

		console.log(data);

		// update new comment
		setComments(data);

		// isLoading false
		setIsLoading(false);

		// close dialog
		setDialogIsOpen(false);
	};

	return (
		<>
			{/* comment */}
			<div key={comment.id} className="my-4 flex items-start gap-2">
				{/* image */}
				<img
					src={comment.author?.photo.url || defaultAvatar.src}
					alt={comment.author?.name || 'default avatar'}
					className="h-8 w-8 rounded-full bg-white"
				/>
				{/* comment */}
				<div className="flex-1">
					<p className="text-sm mb-3 font-semibold">
						{comment.author?.name || '消失的帳號'}
					</p>
					{/* if comment is not delete */}
					{source && comment.author && (
						<div id="comment">
							<MDXRemote {...source} />
						</div>
					)}
					{/* if comment is delete */}
					{!comment.author && (
						<p className="text-sm text-zinc-400">{comment.comment}</p>
					)}
					{
						<p className="flex gap-2 text-xs text-zinc-400 mt-3">
							B{floor}・{moment(comment.createdAt).format('YYYY-MM-DD')}
						</p>
					}
				</div>
				{/* delete button if comment is existed and user is comment author */}
				{userProfile &&
					comment.author &&
					comment.author.id === userProfile?.id && (
						<button
							className="p-2 rounded-lg text-red-500 hover:bg-red-500 transition duration-500 hover:text-white"
							onClick={() => setDialogIsOpen(true)}
						>
							<Trash size={16} />
						</button>
					)}
			</div>
			{/* divide line */}
			<hr className="my-4" />
			{/* delete dialog */}
			{dialogIsOpen && (
				<Dialog
					text="確定要刪除留言嗎？"
					successHandler={deleteCommentHandler}
					cancelHandler={() => setDialogIsOpen(false)}
					isLoading={isLoading}
				/>
			)}
		</>
	);
};

export default PostComment;
