import React, { useState, useEffect } from 'react';
import { getCategories } from '../../services';
import { ICategory } from '../../type';
import cx from 'classnames';

interface IProps {
	selectedCategories: string[];
	setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const Categories = ({ selectedCategories, setSelectedCategories }: IProps) => {
	const [categories, setCategories] = useState<ICategory[]>([]);

	useEffect(() => {
		getCategories().then((categories: ICategory[]) => {
			setCategories(categories);
		});
	}, []);

	const selectCategoryHandler = (slug: string) => {
		if (selectedCategories.includes(slug)) {
			setSelectedCategories(prevState =>
				prevState.filter(category => category !== slug)
			);
		} else {
			setSelectedCategories(prevState => [...prevState, slug]);
		}
	};

	return (
		<div className="flex flex-wrap gap-2">
			{categories.map((category: ICategory) => (
				<button
					className={cx(
						'px-2 py-1 rounded-full border-2 text-xs whitespace-nowrap font-extrabold border-zinc-500 text-zinc-500 hover:bg-zinc-500 hover:text-zinc-50 dark:border-zinc-200 dark:text-zinc-200 dark:hover:text-zinc-800 dark:hover:bg-zinc-200 transition duration-300 tracking-wide',
						selectedCategories.includes(category.slug) &&
							'bg-zinc-500 text-zinc-50 dark:bg-zinc-200  dark:text-zinc-800 '
					)}
					key={category.id}
					onClick={() => selectCategoryHandler(category.slug)}
				>
					{category.name}
				</button>
			))}
		</div>
	);
};

export default Categories;
