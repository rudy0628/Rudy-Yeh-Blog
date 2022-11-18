import React, { useState } from 'react';
import moment from 'moment';
import TurnDownService from 'turndown';

// tiptap and lowlight
import { EditorContent, useEditor } from '@tiptap/react';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import StarterKit from '@tiptap/starter-kit';

// hooks
import useAuthStore from '../../store/authStore';

// Toast
import { toast } from 'react-toastify';
import { TOAST_STYLE } from '../../utils';

// component
import { EditorMenuBar } from '../utils';

// react feather
import { AlertCircle, Send, Loader } from 'react-feather';

// type
import { IComment } from '../../type';

interface IProps {
	slug: string;
	setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
	floor: number;
	scrollToNewComment: () => void;
	setDisplayAllComments: React.Dispatch<React.SetStateAction<boolean>>;
}

// turndown aka turn html to markdown
const turndownService = new TurnDownService({ codeBlockStyle: 'fenced' });

const PostCommentForm = ({
	slug,
	setComments,
	floor,
	scrollToNewComment,
	setDisplayAllComments,
}: IProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const { userProfile }: any = useAuthStore();
	const [comment, setComment] = useState('');

	const editor = useEditor({
		extensions: [
			StarterKit,
			Link.configure({
				openOnClick: false,
			}),
			Image,
		],
		content: ``,
		onUpdate({ editor }) {
			const markdown = turndownService.turndown(editor.getHTML());
			setComment(markdown);
		},
	});

	const submitCommentHandler = async () => {
		if (!userProfile) {
			toast.error('尚未登入請勿進行留言，請登入後再試！', TOAST_STYLE);
			return;
		}

		if (comment.length === 0) {
			toast.error('留言區不能為空白！', TOAST_STYLE);
			return;
		}

		setIsLoading(true);
		const response = await fetch(`/api/${slug}/comment`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: userProfile.id,
				comment,
			}),
		});

		const data = await response.json();

		setComments((prevComments: IComment[]) => [...prevComments, data]);
		setIsLoading(false);

		// clear
		editor!.commands.clearContent();
		setComment('');

		// scroll to new Comment
		scrollToNewComment();
		setDisplayAllComments(true);
	};

	return (
		<div className="w-md lg:w-[650px] px-4 mx-auto mb-16">
			{/* title */}
			<div>
				<h1 className="font-semibold text-2xl">新增留言</h1>
				<hr className="my-6" />
			</div>
			{!userProfile && (
				<p className="rounded-lg flex items-center gap-2 p-2 w-full bg-red-100 text-red-600">
					<AlertCircle size={18} /> 尚未登入不能進行留言！
				</p>
			)}
			{userProfile && (
				<div className="relative">
					{/* user */}
					<div className="flex gap-4 items-center mb-4">
						<img
							src={userProfile.photo.url}
							alt={userProfile.name}
							className="h-8 w-8 rounded-full"
						/>
						<div>
							<p className="text-sm font-semibold">{userProfile.name}</p>
							<p className="text-xs text-zinc-400">
								B{floor}・{moment(new Date()).format('YYYY 年 MM 月 DD 日')}
							</p>
						</div>
					</div>
					{/* editor and its menubar */}
					{!isLoading && <EditorMenuBar editor={editor} />}
					<EditorContent
						className="text-black"
						editor={editor}
						disabled={isLoading}
						value={comment}
					/>
					{/* submit button */}
					<button
						className="absolute bottom-4 right-6 p-2 rounded-lg bg-[#90caf9] text-white hover:bg-[#82b6e0] transition duration-500"
						onClick={submitCommentHandler}
						disabled={isLoading}
					>
						{isLoading && <Loader size={18} className="animate-spin" />}
						{!isLoading && <Send size={18} />}
					</button>
				</div>
			)}
		</div>
	);
};

export default PostCommentForm;
