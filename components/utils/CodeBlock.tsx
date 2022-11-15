import React, { useState } from 'react';
import { Clipboard, Check } from 'react-feather';
import cx from 'classnames';

// syntax highlighter
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, coy } from 'react-syntax-highlighter/dist/esm/styles/prism';

// toast message
import { toast } from 'react-toastify';
import { TOAST_STYLE } from '../../utils';
import 'react-toastify/dist/ReactToastify.css';

interface IProps {
	children: string;
	language: string;
	isDarkMode: boolean;
}

const CodeBlock = ({ children, language, isDarkMode }: IProps) => {
	const [isCopy, setIsCopy] = useState<boolean>(false);

	const copyToClipboard = () => {
		window.navigator.clipboard.writeText(children);
		setIsCopy(true);
		toast.success('複製到剪貼簿成功！', TOAST_STYLE);

		setTimeout(() => {
			setIsCopy(false);
		}, 4000);
	};

	return (
		<div className="relative border-gray-500">
			<SyntaxHighlighter
				showLineNumbers
				style={isDarkMode ? oneDark : coy}
				language={language}
			>
				{children}
			</SyntaxHighlighter>
			{/* copy button */}
			<button
				className={cx(
					'absolute top-4 right-4 transition duration-500 p-2 rounded-md',
					isCopy
						? 'bg-green-600'
						: isDarkMode
						? 'bg-gray-600 hover:bg-gray-500'
						: 'bg-gray-200 hover:bg-gray-300'
				)}
				onClick={copyToClipboard}
			>
				{isCopy ? (
					<Check size={18} color="white" />
				) : (
					<Clipboard size={18} color={isDarkMode ? 'white' : 'gray'} />
				)}
			</button>
		</div>
	);
};

export default CodeBlock;
