import React, { useEffect, useState, useRef, useCallback } from 'react';

import { getPostComments } from '../../services';
import { PostCommentForm, PostComment } from './';
import { NoResult } from '../utils';
import { IComment } from '../../type';
import cx from 'classnames';

interface IProps {
	slug: string;
}

const PostComments = ({ slug }: IProps) => {
	const [comments, setComments] = useState([]);
	const [floor, setFloor] = useState(0);
	const [displayAllComments, setDisplayAllComments] = useState(false);
	const commentsRef = useRef<HTMLInputElement>(null);

	// scroll to new comment
	const scrollToNewComment = useCallback(() => {
		const newCommentY =
			+commentsRef.current?.offsetTop! +
			+commentsRef.current?.clientHeight! -
			500;

		window.scrollTo({
			top: newCommentY,
		});
	}, []);

	useEffect(() => {
		getPostComments(slug).then(comments => {
			setComments(comments);
			setFloor(comments.length + 1);
		});
	}, []);

	return (
		<div
			ref={commentsRef}
			className="w-full pb-32 pt-16 bg-zinc-50 dark:bg-zinc-900"
		>
			{/* comment form */}
			<PostCommentForm
				slug={slug}
				setComments={setComments}
				floor={floor}
				setFloor={setFloor}
				scrollToNewComment={scrollToNewComment}
				setDisplayAllComments={setDisplayAllComments}
			/>
			<div className="w-md lg:w-[650px] px-4 mx-auto">
				<div>
					<h1 className="font-semibold text-2xl">
						留言區（{comments.length}）
					</h1>
					<hr className="my-4" />
					{comments && comments.length > 0 && (
						<div
							className={cx(
								'relative',
								!displayAllComments &&
									comments.length > 2 &&
									'h-[16rem] overflow-y-hidden'
							)}
						>
							{/* comments */}
							{comments.map((comment: IComment, index: number) => (
								<PostComment
									key={comment.id}
									comment={comment}
									floor={index + 1}
									slug={slug}
									setComments={setComments}
								/>
							))}
							{/* show more comment button */}
							{comments.length > 2 && (
								<button
									className={
										displayAllComments
											? 'w-full p-2 h-10 text-sm text-[#90caf9]'
											: 'absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-zinc-50 h-10 text-sm text-[#90caf9] dark:from-zinc-900'
									}
									onClick={() => setDisplayAllComments(prevState => !prevState)}
								>
									{displayAllComments
										? '隱藏所有留言'
										: `展開所有留言（${comments.length}）`}
								</button>
							)}
						</div>
					)}
					{!comments ||
						(comments.length === 0 && <NoResult text="暫時沒有任何留言！" />)}
				</div>
			</div>
		</div>
	);
};

export default PostComments;
