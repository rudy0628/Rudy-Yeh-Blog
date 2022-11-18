import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { TOAST_STYLE } from '../../../utils';
import cx from 'classnames';

interface IQuestion {
	question: string;
	ans1: string;
	ans2: string;
	ans3: string;
	ans4: string;
	correctAns: string;
}

const Question = ({
	question,
	ans1,
	ans2,
	ans3,
	ans4,
	correctAns,
}: IQuestion) => {
	const [correctAnsIsClick, setCorrectAnsIsClick] = useState(false);

	const ansClickHandler = (ans: string) => {
		if (ans === correctAns) {
			toast.success('正確答案！恭喜你又往前了一小步！', TOAST_STYLE);
			setCorrectAnsIsClick(true);
		} else {
			toast.error('回答錯誤，再仔細想看看吧！', TOAST_STYLE);
		}
	};

	return (
		<div
			id="question"
			className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg my-12"
		>
			<p className="text-xs opacity-80 mb-1">小測驗</p>
			<p className="text-sm mb-4">{question}</p>
			<div className="flex flex-col gap-2">
				<button
					className={cx(
						'text-left text-sm rounded-lg px-2 py-1 border-[1px] hover:border-[#90caf9] hover:text-[#90caf9] transition duration-300',
						correctAnsIsClick &&
							ans1 === correctAns &&
							'border-green-600 hover:border-green-600 hover:text-green-600 text-green-600'
					)}
					onClick={() => ansClickHandler(ans1)}
					disabled={correctAnsIsClick}
				>
					A. {ans1}
				</button>
				<button
					className={cx(
						'text-left text-sm rounded-lg px-2 py-1 border-[1px] hover:border-[#90caf9] hover:text-[#90caf9] transition duration-300',
						correctAnsIsClick &&
							ans2 === correctAns &&
							'border-green-600 hover:border-green-600 hover:text-green-600 text-green-600'
					)}
					onClick={() => ansClickHandler(ans2)}
					disabled={correctAnsIsClick}
				>
					B. {ans2}
				</button>
				<button
					className={cx(
						'text-left text-sm rounded-lg px-2 py-1 border-[1px] hover:border-[#90caf9] hover:text-[#90caf9] transition duration-300',
						correctAnsIsClick &&
							ans3 === correctAns &&
							'border-green-600 hover:border-green-600 hover:text-green-600 text-green-600'
					)}
					onClick={() => ansClickHandler(ans3)}
					disabled={correctAnsIsClick}
				>
					C. {ans3}
				</button>
				<button
					className={cx(
						'text-left text-sm rounded-lg px-2 py-1 border-[1px] hover:border-[#90caf9] hover:text-[#90caf9] transition duration-300',
						correctAnsIsClick &&
							ans4 === correctAns &&
							'border-green-600 hover:border-green-600 hover:text-green-600 text-green-600'
					)}
					onClick={() => ansClickHandler(ans4)}
					disabled={correctAnsIsClick}
				>
					D. {ans4}
				</button>
			</div>
		</div>
	);
};

export default Question;
