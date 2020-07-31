import '../css/bootstrap-reboot.css';
import '../css/bootstrap-grid.css';
import '../css/fonts.scss';
import 'material-design-lite/material.min.css';
import '../css/color-change.scss';
import '../css/styles.scss';

import UploadLogo from './uploadLogo.js';
import GoogleFonts from './loadGoogleFonts.js';
import ArcadeFonts from './loadArcadeFonts.js';
import html2canvas from 'html2canvas';
import 'material-design-lite/material.min.js';

class executePageFunctionality {
	constructor() {
		this.uploadService = new UploadLogo();
		this.arcadeFontsService = new ArcadeFonts();

		this.prepareProperties();

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

		this.setEventListeners(this.pageElements);

		this.loadFonts();
	}

	prepareProperties() {
		this.HUNDRED_PERCENT = 100;

		this.isGoogleFonts = false;

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
			arcadeFontsInput: this.elementSelector('#arcadeFonts'),
			googleFontsInput: this.elementSelector('#googleFonts'),
			fontTypeInput: this.elementSelector('#fontTypeSelect'),
			fontColorInput: this.elementSelector('#fontColor'),
			fontSizeInput: this.elementSelector('#fontSize'),
			upDownFontPositionInput: this.elementSelector('#updDownFont'),
			leftRightFontPositionInput: this.elementSelector('#leftRightFont'),
			scaleLogoInput: this.elementSelector('#scaleLogo'),
			getSnapshotInput: this.elementSelector('#snapshotButton')
		};
	}

	loadFonts() {
		if (this.isGoogleFonts) {
			if (!this.googleFontsService) {
				this.googleFontsService = new GoogleFonts();
			}

			this.googleFontsService.appendGoogleFonts(this.pageElements.fontTypeInput);

		} else {
			this.arcadeFontsService.appendArcadeFonts(this.pageElements.fontTypeInput);
		}
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

	prepareEvents() {
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

		return {
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
					if (this.isGoogleFonts) {
						this.googleFontsService.insertSelectedGoogleFont(this.pageElements.fontTypeInput.value);
					}

					this.pageElements.sceneBrandName.style.fontFamily = `'${this.pageElements.fontTypeInput.value}', Arial, sans-serif`;
				},
			arcadeFontsInput: () => {
				this.isGoogleFonts = false;

				this.loadFonts();
				},
			googleFontsInput: () => {
				this.isGoogleFonts = true;

				this.loadFonts();
			},
			logoSizeInput: () =>
				(this.pageElements.sceneLogo.style.transform = `scale(${this.pageElements.logoSizeInput.value})`),
			upDownFontPositionInput: () =>
				(this.pageElements.sceneBrandName.style.bottom = `${sceneHeightForBrand *
				this.pageElements.upDownFontPositionInput.value}px`),
			leftRightFontPositionInput: () =>
				(this.pageElements.sceneBrandName.style.left = `${sceneWidthForBrand *
				this.pageElements.leftRightFontPositionInput.value}px`),
			fontSizeInput: () =>
				(this.pageElements.sceneBrandName.style.fontSize = `${this.pageElements.fontSizeInput.value}px`),
			scaleLogoInput: () =>
				(this.pageElements.scene.style.transform = `scale(${this.pageElements.scaleLogoInput.value})`),
			newLogoInput: (event) => (this.uploadService.previewFile(event.target.files[0], this.pageElements.sceneLogo)),
			getSnapshotInput: () => {
				this.saveAsImage(this.pageElements.scene);
			},
		};
	}

	setEventListeners(elements) {
		const events = this.prepareEvents();

		const eventListenerForInputChanges = (
			element,
			listenerType,
			callbackFunction
		) => element.addEventListener(listenerType, callbackFunction);

		Object.keys(elements)
			.filter(element => element.includes('Input'))
			.forEach(inputElement => {
				if (
					inputElement === 'backgroundColorInput'
					|| inputElement === 'fontColorInput'
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

					if (inputElement === 'newLogoInput'
						|| inputElement === 'arcadeFontsInput'
						|| inputElement === 'googleFontsInput') {
						eventListenerForInputChanges(
							this.pageElements[inputElement],
							'change',
							events[inputElement]
						);
					}
				} else {

					if (inputElement === 'getSnapshotInput') {
						eventListenerForInputChanges(
							this.pageElements[inputElement],
							'click',
							events[inputElement]
						);
					}

					eventListenerForInputChanges(
						this.pageElements[inputElement],
						'input',
						events[inputElement]
					);
				}
			});
	}

	saveAsImage(element) {
		html2canvas(element)
			.then((canvas) => {
				const logo = document.createElement('a');

				logo.href = canvas.toDataURL("image/jpeg").replace("image/png", "image/octet-stream");
				logo.download = 'Logo Scene.png';
				logo.click();
			});
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new executePageFunctionality();
});
