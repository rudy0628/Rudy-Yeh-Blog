import { GraphQLClient, gql } from 'graphql-request';
import { getPostLikes } from '../../../services';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const graphqlClient = new GraphQLClient(graphqlAPI, {
		headers: {
			authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
		},
	});

	if (req.method === 'POST') {
		const { slug } = req.query;
		const { id } = req.body;

		// initial existedLikes
		const existedLikes = await getPostLikes(slug);
		const userLiked = existedLikes.find((like: any) => like.author.id === id);

		if (!userLiked) {
			// if user not liked
			const mutation = gql`
				mutation MyMutation($id: ID!, $slug: String!) {
					updatePost(
						where: { slug: $slug }
						data: {
							likes: {
								create: {
									author: { connect: { id: $id } }
									post: { connect: { slug: $slug } }
								}
							}
						}
					) {
						likes {
							author {
								id
								name
								photo {
									url
								}
							}
						}
					}
				}
			`;

			try {
				const result = await graphqlClient.request(mutation, {
					id,
					slug,
				});

				return res
					.status(200)
					.send({ likes: result.updatePost.likes, isLiked: true });
			} catch (e: any) {
				console.log(e);
			}
		} else {
			// if user liked

			// Find ready to delete id
			const deleteId = existedLikes.find(
				(like: any) => like.author.id === id
			).id;

			const mutation = gql`
				mutation MyMutation($id: ID!, $slug: String!) {
					updatePost(
						where: { slug: $slug }
						data: { likes: { delete: { id: $id } } }
					) {
						likes {
							author {
								id
								name
								photo {
									url
								}
							}
						}
					}
				}
			`;

			try {
				const result = await graphqlClient.request(mutation, {
					id: deleteId,
					slug,
				});

				return res
					.status(200)
					.send({ likes: result.updatePost.likes, isLiked: false });
			} catch (e: any) {
				console.log(e);
			}
		}
	}
}
