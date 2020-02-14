import '../css/bootstrap.css';
import '../css/fonts.css';
import '../css/styles.scss';

class executePageFunctionality {
	HUNDRED_PERCENT = 100;

	elementSelector = (selector) => document.querySelector(selector);

	pageElements = {
		scene: this.elementSelector('.logo-scene-container'),
		sceneBackground: this.elementSelector('.background-area'),
		sceneLogo: this.elementSelector('.logo-area img'),
		sceneBrandName: this.elementSelector('.brand-name-area'),
		backgroundColorInput: this.elementSelector('#backgroundColor'),
		upDownLogoPositionInput: this.elementSelector('#updDown'),
		leftRightLogoPositionInput: this.elementSelector('#leftRight'),
		brandNameInput: this.elementSelector('#brandName'),
		fontTypeInput: this.elementSelector('#fontTypeSelect'),
		fontColorInput: this.elementSelector('#fontColor'),
		fontSizeInput: this.elementSelector('#fontSize'),
		upDownFontPositionInput: this.elementSelector('#updDownFont'),
		leftRightFontPositionInput: this.elementSelector('#leftRightFont'),
		scaleLogoInput: this.elementSelector('#scaleLogo'),
	};

	constructor() {
		const sceneBackgroundColor = this.getComputedStyleOfElement(this.pageElements.sceneBackground, 'background-color');
		const brandFontColor = this.getComputedStyleOfElement(this.pageElements.sceneBrandName, 'color');

		this.pageElements.brandNameInput.value = this.pageElements.sceneBrandName.innerText;
		this.pageElements.backgroundColorInput.value = this.convertRGBtoHEX(sceneBackgroundColor);
		this.pageElements.fontColorInput.value = this.convertRGBtoHEX(brandFontColor);

		this.setEventListeners();
	}

	getComputedStyleOfElement(element, style) {
		return getComputedStyle(element, null).getPropertyValue(style);
	}

	convertRGBtoHEX(rgbColor) {
		rgbColor = rgbColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

		return `#${this.calculateHex(rgbColor[1])}${this.calculateHex(rgbColor[2])}${this.calculateHex(rgbColor[3])}`;
	}

	calculateHex(digit) {
		const hexDigits = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];

		return isNaN(digit) ? "00" : hexDigits[(digit - digit % 16) / 16] + hexDigits[digit % 16];
	}

	calculateOneToHundredStepOfScene(element) {
		return [
			(this.pageElements.scene.getBoundingClientRect().width - element.offsetWidth) / this.HUNDRED_PERCENT,
			(this.pageElements.scene.getBoundingClientRect().height - element.offsetHeight) / this.HUNDRED_PERCENT,
		];
	}

	setEventListeners() {
		const [sceneWidthForLogo, sceneHeightForLogo] = this.calculateOneToHundredStepOfScene(this.pageElements.sceneLogo);
		const [sceneWidthForBrand, sceneHeightForBrand] = this.calculateOneToHundredStepOfScene(this.pageElements.sceneBrandName);

		const eventListenerForInputChanges = (element, listenerType, callbackFuncion) => element.addEventListener(listenerType, callbackFuncion);

		const events = {
			upDownLogoPositionInput: () => this.pageElements.sceneLogo.style.top = `${sceneHeightForLogo * this.pageElements.upDownLogoPositionInput.value}px`,
			leftRightLogoPositionInput: () => this.pageElements.sceneLogo.style.left = `${sceneWidthForLogo * this.pageElements.leftRightLogoPositionInput.value}px`,
			brandNameInput: () => this.pageElements.sceneBrandName.innerHTML = `${this.pageElements.brandNameInput.value}`,
			fontTypeInput: () => this.pageElements.sceneBrandName.style.fontFamily = this.pageElements.fontTypeInput.value,
			upDownFontPositionInput: () => this.pageElements.sceneBrandName.style.bottom = `${sceneHeightForBrand * this.pageElements.upDownFontPositionInput.value}px`,
			leftRightFontPositionInput: () => this.pageElements.sceneBrandName.style.right = `${sceneWidthForBrand * this.pageElements.leftRightFontPositionInput.value}px`,
			fontSizeInput: () => this.pageElements.sceneBrandName.style.fontSize = `${this.pageElements.fontSizeInput.value}px`,
			scaleLogoInput: () => this.pageElements.scene.style.transform = `scale(${this.pageElements.scaleLogoInput.value})`,
		};

		Object.keys(this.pageElements)
			.filter(element => element.includes('Input'))
			.forEach(inputElement => {
				if (inputElement === 'backgroundColorInput' || inputElement === 'fontColorInput') {

					inputElement === 'backgroundColorInput'
						? eventListenerForInputChanges(this.pageElements[inputElement], 'change', () => this.pageElements.sceneBackground.style.backgroundColor = `${this.pageElements[inputElement].value}`)
						: eventListenerForInputChanges(this.pageElements[inputElement], 'change', () => this.pageElements.sceneBrandName.style.color = `${this.pageElements[inputElement].value}`);
				} else {

					eventListenerForInputChanges(
						this.pageElements[inputElement],
						'input',
						events[inputElement]
					);
				}
			});
	};
}

document.addEventListener('DOMContentLoaded', () => {
	new executePageFunctionality();
});