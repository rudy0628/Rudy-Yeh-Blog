import cx from 'classnames';

import { Header } from '../components/Header';
import { PostCard } from '../components/Post';
import { PageHead } from '../components/utils';
import { getPosts } from '../services/index';

import { IPost } from '../type';

interface IProps {
	posts: IPost[];
}

const Home = ({ posts }: IProps) => {
	return (
		<div className="min-h-screen">
			<PageHead canonicalUrl="https://blog.rudyyeh.dev" />
			<div className="container py-8 px-6 2xl:px-32 lg:px-12 lg:pb-24  mx-auto flex flex-row flex-wrap">
				<Header />
				{/* Posts */}
				<div className="w-full my-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
					{posts &&
						posts.map((post: IPost, index) => (
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
