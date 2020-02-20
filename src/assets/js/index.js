import '../css/bootstrap-reboot.css';
import '../css/bootstrap-grid.css';
import '../css/fonts.scss';
import '../css/styles.scss';

import UploadLogo from './uploadLogo.js';
import GoogleFonts from './loadGoogleFonts.js';

class executePageFunctionality {
	constructor() {
		this.uploadService = new UploadLogo();
		this.googleFontsService = new GoogleFonts();

		this.addProperties();

		const sceneBackgroundColor = this.getComputedStyleOfElement(
			this.pageElements.sceneBackground,
			'background-color'
		);
		const brandFontColor = this.getComputedStyleOfElement(
			this.pageElements.sceneBrandName,
			'color'
		);

		this.pageElements.brandNameInput.value = this.pageElements.sceneBrandName.innerText;
		this.pageElements.backgroundColorInput.value = this.convertRGBtoHEX(
			sceneBackgroundColor
		);
		this.pageElements.fontColorInput.value = this.convertRGBtoHEX(
			brandFontColor
		);

		this.setEventListeners();

		this.googleFontsService.appendGoogleFonts(this.pageElements.fontTypeInput);
	}

	addProperties() {
		this.HUNDRED_PERCENT = 100;

		this.elementSelector = selector => document.querySelector(selector);

		this.pageElements = {
			scene: this.elementSelector('.logo-scene-container'),
			sceneBackground: this.elementSelector('.background-area'),
			newLogoInput: this.elementSelector('#newLogo'),
			sceneLogo: this.elementSelector('.logo-area img'),
			sceneBrandName: this.elementSelector('.brand-name-area'),
			backgroundColorInput: this.elementSelector('#backgroundColor'),
			logoSizeInput: this.elementSelector('#logoSize'),
			upDownLogoPositionInput: this.elementSelector('#updDown'),
			leftRightLogoPositionInput: this.elementSelector('#leftRight'),
			brandNameInput: this.elementSelector('#brandName'),
			fontTypeInput: this.elementSelector('#fontTypeSelect'),
			fontColorInput: this.elementSelector('#fontColor'),
			fontSizeInput: this.elementSelector('#fontSize'),
			upDownFontPositionInput: this.elementSelector('#updDownFont'),
			leftRightFontPositionInput: this.elementSelector('#leftRightFont'),
			scaleLogoInput: this.elementSelector('#scaleLogo')
		};
	}

	getComputedStyleOfElement(element, style) {
		return getComputedStyle(element, null).getPropertyValue(style);
	}

	convertRGBtoHEX(rgbColor) {
		rgbColor = rgbColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

		return `#${this.calculateHex(rgbColor[1])}${this.calculateHex(
			rgbColor[2]
		)}${this.calculateHex(rgbColor[3])}`;
	}

	calculateHex(digit) {
		const hexDigits = [
			'0',
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
			'a',
			'b',
			'c',
			'd',
			'e',
			'f'
		];

		return isNaN(digit)
			? '00'
			: hexDigits[(digit - (digit % 16)) / 16] + hexDigits[digit % 16];
	}

	calculateOneToHundredStepOfScene(element) {
		return [
			(this.pageElements.scene.getBoundingClientRect().width -
				element.offsetWidth) /
			this.HUNDRED_PERCENT,
			(this.pageElements.scene.getBoundingClientRect().height -
				element.offsetHeight) /
			this.HUNDRED_PERCENT
		];
	}

	setEventListeners() {
		const [
			sceneWidthForLogo,
			sceneHeightForLogo
		] = this.calculateOneToHundredStepOfScene(this.pageElements.sceneLogo);
		const [
			sceneWidthForBrand,
			sceneHeightForBrand
		] = this.calculateOneToHundredStepOfScene(
			this.pageElements.sceneBrandName
		);

		const eventListenerForInputChanges = (
			element,
			listenerType,
			callbackFuncion
		) => element.addEventListener(listenerType, callbackFuncion);

		const events = {
			upDownLogoPositionInput: () =>
				(this.pageElements.sceneLogo.style.top = `${sceneHeightForLogo *
				this.pageElements.upDownLogoPositionInput.value}px`),
			leftRightLogoPositionInput: () =>
				(this.pageElements.sceneLogo.style.left = `${sceneWidthForLogo *
				this.pageElements.leftRightLogoPositionInput.value}px`),
			brandNameInput: () =>
				(this.pageElements.sceneBrandName.innerHTML = `${this.pageElements.brandNameInput.value}`),
			fontTypeInput: () =>
				{
					this.googleFontsService.insertSelectedGoogleFont(this.pageElements.fontTypeInput.value);

					this.pageElements.sceneBrandName.style.fontFamily = `'${this.pageElements.fontTypeInput.value}', Arial, sans-serif`;
				},
			logoSizeInput: () =>
				(this.pageElements.sceneLogo.style.transform = `scale(${this.pageElements.logoSizeInput.value})`),
			upDownFontPositionInput: () =>
				(this.pageElements.sceneBrandName.style.bottom = `${sceneHeightForBrand *
				this.pageElements.upDownFontPositionInput.value}px`),
			leftRightFontPositionInput: () =>
				(this.pageElements.sceneBrandName.style.right = `${sceneWidthForBrand *
				this.pageElements.leftRightFontPositionInput.value}px`),
			fontSizeInput: () =>
				(this.pageElements.sceneBrandName.style.fontSize = `${this.pageElements.fontSizeInput.value}px`),
			scaleLogoInput: () =>
				(this.pageElements.scene.style.transform = `scale(${this.pageElements.scaleLogoInput.value})`),
			newLogoInput: (event) => (this.uploadService.previewFile(event.target.files[0], this.pageElements.sceneLogo))
		};

		Object.keys(this.pageElements)
			.filter(element => element.includes('Input'))
			.forEach(inputElement => {
				if (
					inputElement === 'backgroundColorInput' ||
					inputElement === 'fontColorInput'
				) {
					inputElement === 'backgroundColorInput'
						? eventListenerForInputChanges(
						this.pageElements[inputElement],
						'change',
						() =>
							(this.pageElements.sceneBackground.style.backgroundColor = `${this.pageElements[inputElement].value}`)
						)
						: eventListenerForInputChanges(
						this.pageElements[inputElement],
						'change',
						() =>
							(this.pageElements.sceneBrandName.style.color = `${this.pageElements[inputElement].value}`)
						);

					if (inputElement === 'newLogoInput') {
						eventListenerForInputChanges(
							this.pageElements[inputElement],
							'change',
							events[inputElement]
						);
					}
				} else {
					eventListenerForInputChanges(
						this.pageElements[inputElement],
						'input',
						events[inputElement]
					);
				}
			});
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new executePageFunctionality();
});
