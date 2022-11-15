import React from 'react';

interface IProps {
	noteTitle: string;
	children: React.ReactNode;
	color: string;
}

const NoteBlock = ({ noteTitle, children, color }: IProps) => {
	return (
		<div
			className={`rounded-lg border-[1px] border-${color}-600 p-3 text-${color}-600`}
			id="noteBlock"
		>
			<span className="font-extrabold">{noteTitle}</span>：{children}
		</div>
	);
};

export default NoteBlock;
