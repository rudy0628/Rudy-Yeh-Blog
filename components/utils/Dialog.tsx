import React from 'react';
import { Loader } from 'react-feather';

interface IProps {
	cancelHandler: any;
	successHandler: any;
	text: string;
	isLoading: boolean;
}

const Dialog = ({ cancelHandler, successHandler, text, isLoading }: IProps) => {
	return (
		<>
			{/* background */}
			<div
				className="bg-black fixed top-0 left-0 h-[100vh] w-[100vw] bg-opacity-30 z-50"
				onClick={cancelHandler}
			/>
			{/* dialog */}
			<div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[100] bg-white dark:bg-zinc-800 rounded-lg p-4 bg:max-w-[40vw] max-w-[80vw]">
				<h1 className="text-xl font-semibold mb-3 tracking-wide">{text}</h1>
				{isLoading && (
					<Loader className="animate-spin ml-auto" size={16} color="#90caf9" />
				)}
				{!isLoading && (
					<div className="flex gap-3 w-full justify-end">
						<button
							className="text-[#90caf9] hover:text-[#82b6e0] transition duration-500 tracking-wide"
							onClick={cancelHandler}
						>
							取消
						</button>
						<button
							className="text-red-500 hover:text-red-700 transition duration-500 tracking-wide"
							onClick={successHandler}
						>
							確定
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default Dialog;
