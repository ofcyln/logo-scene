import Fonts from './googleFonts.json';

export default class GoogleFonts {
	constructor() {
		this.googleFonts = Fonts;
	}

	insertSelectedGoogleFont(font) {
		font = font.split(' ').join('+');

		const fontSelection = `https://fonts.googleapis.com/css?family=Open+Sans${font ? '|' + font : ''}&display=swap`;

		document.querySelector('#googleFont').setAttribute('href', fontSelection);
	}

	appendGoogleFonts(parentElement) {
		parentElement.innerHTML = '';

		this.createOrganizedGoogleFonts().forEach(font => {
			parentElement.insertAdjacentHTML('beforeend', `<option value="${font.name}">${font.name}</option>`);
		});
	}

	createOrganizedGoogleFonts() {
		return [...this.googleFonts].map((font, index) => {
			return {
				index,
				name: font,
			};
		});
	}
}
