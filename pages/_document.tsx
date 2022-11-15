import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="zh-TW">
				<Head>
					<script
						async
						src="https://www.googletagmanager.com/gtag/js?id=G-0WBD32QJ5Y"
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
						
							gtag('config', 'G-0WBD32QJ5Y');
            `,
						}}
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
