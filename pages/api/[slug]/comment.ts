import { GraphQLClient, gql } from 'graphql-request';
import { getPostComments } from '../../../services';

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
		const { comment, id } = req.body;

		const mutation = gql`
			mutation CreateComment($comment: String!, $id: ID!, $slug: String!) {
				createComment(
					data: {
						author: { connect: { id: $id } }
						comment: $comment
						post: { connect: { slug: $slug } }
					}
				) {
					author {
						id
						name
						photo {
							url
						}
					}
					createdAt
					id
					comment
				}
			}
		`;

		try {
			const result = await graphqlClient.request(mutation, {
				id,
				slug,
				comment,
			});

			return res.status(201).send(result.createComment);
		} catch (e: any) {
			console.log(e);
		}
	}

	if (req.method === 'DELETE') {
		const { slug } = req.query;
		const { id } = req.body;

		const mutation = gql`
			mutation UpdateComment($id: ID!) {
				updateComment(
					where: { id: $id }
					data: {
						author: { disconnect: true }
						comment: "這則留言就像變了心的女朋友，回不來了！"
					}
				) {
					author {
						id
						name
						photo {
							url
						}
					}
					createdAt
					id
					comment
				}
			}
		`;

		try {
			const result = await graphqlClient.request(mutation, {
				id,
			});

			return res.status(201).send(result.updateComment);
		} catch (e: any) {
			console.log(e);
		}
	}
}
