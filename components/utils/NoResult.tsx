import React from 'react';

const NoResult = ({ text }: { text: string }) => {
	return (
		<p className="p-2 border-2 rounded-lg border-[#90caf9] text-[#90caf9] ">
			{text}
		</p>
	);
};

export default NoResult;
