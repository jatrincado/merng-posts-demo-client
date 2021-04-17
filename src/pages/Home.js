import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition, Ref } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import { useObserver } from "../util/hooks";

function Home() {
	const { user } = useContext(AuthContext);

	//data se destructura con alias posts y default objeto vacío
	const { loading, data: { getPosts: posts } = {}, fetchMore } = useQuery(
		FETCH_POSTS_QUERY,
		{
			variables: {
				offset: 0,
				limit: user ? 2 : 3,
			},
		}
	);

	const loadMore = () => {
		if(posts) fetchMore({
			variables: { offset: posts.length, limit: 3 },
		});
	};

	const ref = useObserver(loadMore, { root: null, threshold: 0.5}, []);

	return (
		<Grid columns={3}>
			<Grid.Row className="page-title">
				<h1>Recent Posts</h1>
			</Grid.Row>
			<Grid.Row>
				{user && (
					<Grid.Column>
						<PostForm />
					</Grid.Column>
				)}
				{loading ? (
					<h1>Loading posts...</h1>
				) : (
					<Transition.Group>
						{posts &&
							posts.map((post) => (
								<Grid.Column key={post.id} style={{ marginBottom: 20 }}>
									<PostCard post={post} />
								</Grid.Column>
							))}
					</Transition.Group>
				)}
				<Ref innerRef={ref}><div></div></Ref>
			</Grid.Row>
		</Grid>
	);
}

export default Home;
