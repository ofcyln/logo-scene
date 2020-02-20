import Fonts from './arcadeFonts.json';

export default class ArcadeFonts {
	constructor() {
		this.arcadeFonts = Fonts;
	}

	appendArcadeFonts(parentElement) {
		parentElement.innerHTML = '';

		this.createOrganizedArcadeFonts().forEach(font => {
			const fontValue = font.name.toLowerCase().split(' ').join('');

			parentElement.insertAdjacentHTML('beforeend', `<option value="${fontValue}">${font.name}</option>`);
		});
	}

	createOrganizedArcadeFonts() {
		return [...this.arcadeFonts].map((font, index) => {
			return {
				index,
				name: font,
			};
		});
	}
}
