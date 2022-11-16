import React from 'react';

const NoteBlock = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			className={`rounded-lg border-[1px] !border-yellow-600 p-3 !text-yellow-600`}
			id="noteBlock"
		>
			<span className="font-extrabold">注意</span>：{children}
		</div>
	);
};

export default NoteBlock;
