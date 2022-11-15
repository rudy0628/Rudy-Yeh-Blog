import Link from 'next/link';
import { PageHead } from '../components/utils';
import { SocialLinks } from '../components/Header';

export default function () {
	return (
		<div className="min-h-screen">
			<PageHead />
			<div className="container 2xl:px-64 px-6 lg:px-32 mx-auto flex flex-row py-8 lg:pb-24 flex-wrap">
				<div className="mt-4 lg:mt-12">
					<Link href="/" scroll>
						<div className="font-extrabold text-xl lg:text-3xl mb-4 lg:mb-0 cursor-pointer flex flex-row lg:flex-col items-baseline">
							<p className="mr-2">Rudy Yeh</p>
							<p className="text-lg text-[#90caf9]">Blog</p>
						</div>
					</Link>
					<SocialLinks />
				</div>
				<div className="w-full my-16">
					<h1 className="font-extrabold text-5xl">喔...，好像發生了一點錯誤</h1>
					<p className="text-lg mt-12 mb-2 font-bold">此頁面不存在</p>
					<p className="opacity-50 font-bold">This page is not available</p>
					<div className="mt-32 mb-8">
						<p>如果您願意的話，請聯絡我您從哪裡訪問這個頁面的！</p>
					</div>
					<Link href="/" className="text-[#90caf9] font-bold">
						回首頁
					</Link>
				</div>
			</div>
		</div>
	);
}
