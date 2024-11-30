export interface MainHeroRequest {
	name: string;
	title: string;
	description: string;
	img: File | null;
	imgUrl?: string;
	colorHex: string;
	borderColorHex: string;
	textColorHex: string;
}
