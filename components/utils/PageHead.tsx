import Head from 'next/head';

interface IProps {
	title?: string;
	description?: string;
	canonicalUrl?: string;
	type?: string;
	keywords?: string[];
}

const PageHead = ({
	title,
	description,
	canonicalUrl,
	type,
	keywords,
}: IProps) => {
	return (
		<Head>
			<title>{title || 'Blog | Rudy Yeh 葉世平'}</title>
			<meta
				property="og:title"
				content={title || 'Blog | Rudy Yeh 葉世平'}
				key="title"
			/>
			<meta name="robots" content="index,follow" />
			{canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
			<meta
				name="description"
				content={
					description ||
					'我是葉世平，畢業於國立高雄科技大學資訊管理系，喜歡網頁前後端開發，目前是一名網頁前端開發者，歡迎參觀我的部落格'
				}
			/>
			<meta
				name="keywords"
				content={
					keywords?.join(', ') ||
					'React, Javascript, Typescript, 網站開發, 軟體開發, 前端, 後端, UI, UX, Graphql, GraphCMS, Zustand, Blog, 部落格, RudyYeh, 葉世平, html, css'
				}
			/>
			<meta name="author" content="Rudy Yeh 葉世平" />
			<meta property="og:type" content={type || 'website'} key="type" />
			<meta
				property="og:description"
				content={
					description ||
					'我是葉世平，畢業於國立高雄科技大學資訊管理系，喜歡網頁前後端開發，目前是一名網頁前端開發者，歡迎參觀我的部落格'
				}
			/>
			<meta name="twitter:card" content="summary_large_image" />
			<link rel="icon" href="/favicon.png" />
			<meta name="theme-color" content="#90caf9" />
		</Head>
	);
};

export default PageHead;
