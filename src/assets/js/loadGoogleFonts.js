import Fonts from './googleFonts.json';

export default class GoogleFonts {
	constructor() {
		this.googleFonts = Fonts;
	}

	insertSelectedGoogleFont(font) {
		font = font.split(' ').join('+');

		const fontSelection = `https://fonts.googleapis.com/css?family=${font}&display=swap`;

		this.createHeadLinkTag(fontSelection);
	}

	createHeadLinkTag(fontSelection) {
		const link = document.createElement( "link" );
		link.href = fontSelection;
		link.type = "text/css";
		link.rel = "stylesheet";

		return document.getElementsByTagName('head')[0].appendChild(link);
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
