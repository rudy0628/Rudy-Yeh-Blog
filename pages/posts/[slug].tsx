import React, { useState, useEffect } from 'react';
import { getPosts, getPostDetails } from '../../services';
import dynamic from 'next/dynamic';

import { PageHead } from '../../components/utils';
import {
	PostDetailNav,
	PostDetailHeader,
	PostAboutUser,
} from '../../components/Post';
const PostComments = dynamic(
	() => import('../../components/Post/PostComments')
);
const PostDetailContent = dynamic(
	() => import('../../components/Post/PostDetailContent')
);
const PostRelatedPosts = dynamic(
	() => import('../../components/Post/PostRelatedPosts')
);

import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import { IPostDetail } from '../../type';

interface IProps {
	post: IPostDetail;
	source: MDXRemoteSerializeResult;
}

const PostDetail = ({ post, source }: IProps) => {
	const [shouldHideWhiteLogo, setShouldHideWhiteLogo] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (document.documentElement.scrollTop > 36 * 16) {
				setShouldHideWhiteLogo(true);
			} else {
				setShouldHideWhiteLogo(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div>
			{/* Page Head */}
			<PageHead
				canonicalUrl={`https://blog.rudyyeh.dev/posts/${post.slug}`}
				title={`${post ? post.title : 'Blog'} | Rudy Yeh 葉世平`}
				type="article"
				description={post.excerpt}
			/>
			{/* Post Navbar */}
			<PostDetailNav shouldHideWhiteLogo={shouldHideWhiteLogo} />
			{/* Post Header */}
			<PostDetailHeader post={post} />
			{/* Post Content */}
			<PostDetailContent
				source={source}
				slug={post.slug}
				prevPost={post.prevPost?.post || null}
				nextPost={post.nextPost?.post || null}
			/>
			{/* Post Comments */}
			<PostComments slug={post.slug} />
			{/* About Post Author */}
			<PostAboutUser author={post.author} />
			{/* Related categories post */}
			<PostRelatedPosts categories={post.categories} slug={post.slug} />
		</div>
	);
};

export async function getStaticProps({
	params: { slug },
}: {
	params: { slug: string };
}) {
	const data = await getPostDetails(slug);
	const mdxSource = await serialize(data.content);

	return {
		revalidate: 10,
		props: {
			post: data,
			source: mdxSource,
		},
	};
}

export async function getStaticPaths() {
	const posts = await getPosts();

	return {
		paths: posts.map(({ node: { slug } }: { node: { slug: string } }) => ({
			params: { slug },
		})),
		fallback: false,
	};
}

export default PostDetail;
