import React, { useCallback, memo } from 'react';
import {
	Bold,
	Italic,
	Code,
	Link2,
	List,
	Image as ImageIcon,
} from 'react-feather';

const EditorMenuBar = ({ editor }: any) => {
	const setLink = useCallback(() => {
		const previousUrl = editor.getAttributes('link').href;
		const url = window.prompt('URL', previousUrl);

		// cancelled
		if (url === null) {
			return;
		}

		// empty
		if (url === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run();

			return;
		}

		// update link
		editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
	}, [editor]);

	const addImage = useCallback(() => {
		const url = window.prompt('URL');

		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	}, [editor]);

	if (!editor) {
		return null;
	}

	return (
		<div className="flex flex-wrap gap-2 mb-2">
			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				className={
					editor.isActive('bold')
						? 'p-1 bg-zinc-500 text-white text-sm rounded-md'
						: 'p-1 rounded-md hover:bg-zinc-500 hover:text-white text-sm transition duration-400'
				}
			>
				<Bold size={14} />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				className={
					editor.isActive('italic')
						? 'p-1 bg-zinc-500 text-white text-sm rounded-md'
						: 'p-1 rounded-md hover:bg-zinc-500 hover:text-white text-sm transition duration-400'
				}
			>
				<Italic size={14} />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleCode().run()}
				disabled={!editor.can().chain().focus().toggleCode().run()}
				className={
					editor.isActive('code')
						? 'p-1 bg-zinc-500 text-white text-sm rounded-md'
						: 'p-1 rounded-md hover:bg-zinc-500 hover:text-white text-sm transition duration-400'
				}
			>
				<Code size={14} />
			</button>
			<button
				onClick={() => editor.chain().focus().setParagraph().run()}
				className={
					editor.isActive('paragraph')
						? 'p-1 bg-zinc-500 text-white text-sm rounded-md'
						: 'p-1 rounded-md hover:bg-zinc-500 hover:text-white text-sm transition duration-400'
				}
			>
				P
			</button>
			<button
				onClick={setLink}
				className={
					editor.isActive('link')
						? 'p-1 bg-zinc-500 text-white text-sm rounded-md'
						: 'p-1 rounded-md hover:bg-zinc-500 hover:text-white text-sm transition duration-400'
				}
			>
				<Link2 size={14} />
			</button>
			<button
				onClick={addImage}
				className="p-1 rounded-md hover:bg-zinc-500 hover:text-white text-sm transition duration-400"
			>
				<ImageIcon size={14} />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				className={
					editor.isActive('heading', { level: 1 })
						? 'p-1 bg-zinc-500 text-white text-sm rounded-md'
						: 'p-1 rounded-md hover:bg-zinc-500 hover:text-white text-sm transition duration-400'
				}
			>
				H1
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				className={
					editor.isActive('heading', { level: 2 })
						? 'p-1 bg-zinc-500 text-white text-sm rounded-md'
						: 'p-1 rounded-md hover:bg-zinc-500 hover:text-white text-sm transition duration-400'
				}
			>
				H2
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={
					editor.isActive('bulletList')
						? 'p-1 bg-zinc-500 text-white text-sm rounded-md'
						: 'p-1 rounded-md hover:bg-zinc-500 hover:text-white text-sm transition duration-400'
				}
			>
				<List size={14} />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				className={
					editor.isActive('codeBlock')
						? 'p-1 bg-zinc-500 text-white text-sm rounded-md'
						: 'p-1 rounded-md hover:bg-zinc-500 hover:text-white text-sm transition duration-400'
				}
			>
				Code Block
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				className={
					editor.isActive('blockquote')
						? 'p-1 bg-zinc-500 text-white text-sm rounded-md'
						: 'p-1 rounded-md hover:bg-zinc-500 hover:text-white text-sm transition duration-400'
				}
			>
				Blockquote
			</button>
			<button
				onClick={() => editor.chain().focus().setHorizontalRule().run()}
				className="p-1 rounded-md hover:bg-zinc-500 hover:text-white text-sm transition duration-400"
			>
				Horizontal Rule
			</button>
		</div>
	);
};

export default memo(EditorMenuBar);
