import { useState } from 'react';
import cx from 'classnames';

import { Header } from '../components/Header';
import { PostCard } from '../components/Post';
import { PageHead, Categories, NoResult } from '../components/utils';
import { getPosts } from '../services/index';

import { IPost } from '../type';

interface IProps {
	posts: IPost[];
}

const Home = ({ posts }: IProps) => {
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	let filterPosts: IPost[];
	if (selectedCategories.length > 0) {
		filterPosts = posts.filter((post: IPost) => {
			const found = post.node.categories.some((category: any) =>
				selectedCategories.includes(category.slug)
			);

			return found;
		});
	} else {
		filterPosts = posts;
	}

	return (
		<div className="min-h-screen">
			<PageHead canonicalUrl="https://blog.rudyyeh.dev" />
			<div className="container py-8 px-6 2xl:px-32 lg:px-12 lg:pb-24  mx-auto flex flex-col">
				{/* Header */}
				<Header />
				{/* Categories */}
				<Categories
					selectedCategories={selectedCategories}
					setSelectedCategories={setSelectedCategories}
				/>
				{/* Posts */}
				<div className="w-full my-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
					{filterPosts &&
						filterPosts.map((post: IPost, index) => (
							<div key={index} className={cx(index === 0 && 'md:col-span-2')}>
								<PostCard
									post={post}
									imageClassName={cx(
										index === 0 && 'h-64 lg:h-96',
										index === 1 && 'h-64',
										index > 1 && 'h-48 lg:h-64'
									)}
								/>
							</div>
						))}
					{!filterPosts ||
						(filterPosts.length === 0 && (
							<NoResult text="暫時沒有任何文章！" />
						))}
				</div>
			</div>
		</div>
	);
};

export async function getStaticProps() {
	const posts = (await getPosts()) || [];

	return {
		props: {
			posts,
		},
	};
}

export default Home;
