"use client";

import React, { useState } from "react";

const images = [
	"https://picsum.photos/id/1015/1000/600",
	"https://picsum.photos/id/1018/1000/600",
	"https://picsum.photos/id/1015/1000/600",
];

export default function CarouselService() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = () => {
		setCurrentIndex((currentIndex + 1) % images.length);
	};

	const prevSlide = () => {
		setCurrentIndex((currentIndex - 1 + images.length) % images.length);
	};
	return (
		<div className="flex flex-col justify-evenly items-center w-full h-full">
			<div className="relative w-full h-64 overflow-hidden">
				<div
					className="absolute inset-0 w-full h-full transition-transform duration-500"
					style={{ transform: `translateX(-${currentIndex * 100}%)` }}
				>
					{images.map((image, index) => (
						<img
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={index}
							src={image}
							alt=""
							className="object-cover w-full h-full"
						/>
					))}
				</div>
			</div>
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				className="absolute top-0 left-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group"
				onClick={prevSlide}
			>
				<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/50">
					<svg
						className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</span>
			</button>
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				className="absolute top-0 right-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group"
				onClick={nextSlide}
			>
				<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/50">
					<svg
						className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</span>
			</button>
		</div>
	);
}
