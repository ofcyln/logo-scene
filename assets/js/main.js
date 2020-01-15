document.addEventListener('DOMContentLoaded', () => {
	const elementSelector = (selector) => document.querySelector(selector);

	const pageElements = {
		scene: elementSelector('.logo-scene-container'),
		sceneBackground: elementSelector('.background-area'),
		sceneLogo: elementSelector('.logo-area img'),
		sceneBrandName: elementSelector('.brand-name-area'),
		backgroundColorInput: elementSelector('#backgroundColor'),
		upDownLogoPositionInput: elementSelector('#updDown'),
		leftRightLogoPositionInput: elementSelector('#leftRight'),
		brandNameInput: elementSelector('#brandName'),
		fontTypeInput: elementSelector('#fontTypeSelect'),
		fontColorInput: elementSelector('#fontColor'),
		fontSizeInput: elementSelector('#fontSize'),
		upDownFontPositionInput: elementSelector('#updDownFont'),
		leftRightFontPositionInput: elementSelector('#leftRightFont'),
		scaleLogoInput: elementSelector('#scaleLogo'),
	};

	const calculateOneToHundredStepOfScene = (element) => ([
		(pageElements.scene.getBoundingClientRect().width - element.offsetWidth) / 100,
		(pageElements.scene.getBoundingClientRect().height - element.offsetHeight) / 100,
	]);

	const [sceneWidthForLogo, sceneHeightForLogo] = calculateOneToHundredStepOfScene(pageElements.sceneLogo);
	const [sceneWidthForBrand, sceneHeightForBrand] = calculateOneToHundredStepOfScene(pageElements.sceneBrandName);

	// const eventListenerForInputChanges = (element, listenerType, callbackFuncion) => element.addEventListener(listenerType, callbackFuncion);

	// Object.keys(pageElements)
	// .filter(element => element.includes('Input'))
	// .forEach(inputElement => {
	//     if (inputElement === 'backgroundColorInput' || inputElement === 'fontTypeInput') {
	//         if (inputElement === 'backgroundColorInput') {
	//             eventListenerForInputChanges(
	//                 pageElements[inputElement],
	//                 'change',
	//                 pageElements.sceneBackground.style.backgroundColor = `${pageElements.backgroundColorInput.value}`
	//             );
	//         } else {

	//         }

	//     }
	// });

	pageElements.backgroundColorInput
		.addEventListener(
			'change',
			() => {
				pageElements.sceneBackground.style.backgroundColor = `${pageElements.backgroundColorInput.value}`;
			},
		);

	pageElements.upDownLogoPositionInput
		.addEventListener(
			'input',
			() => {
				pageElements.sceneLogo.style.top = `${sceneHeightForLogo * pageElements.upDownLogoPositionInput.value}px`;
			},
		);

	pageElements.leftRightLogoPositionInput
		.addEventListener(
			'input',
			() => {
				pageElements.sceneLogo.style.left = `${sceneWidthForLogo * pageElements.leftRightLogoPositionInput.value}px`;
			},
		);

	pageElements.brandNameInput
		.addEventListener(
			'input',
			() => {
				pageElements.sceneBrandName.innerHTML = `${pageElements.brandNameInput.value}`;
			},
		);

	pageElements.fontColorInput
		.addEventListener(
			'change',
			() => {
				pageElements.sceneBrandName.style.color = `${pageElements.fontColorInput.value}`;
			},
		);

	pageElements.fontTypeInput
		.addEventListener(
			'input',
			() => {
				pageElements.sceneBrandName.style.fontFamily = pageElements.fontTypeInput.value;
			},
		);

	pageElements.upDownFontPositionInput
		.addEventListener(
			'input',
			() => {
				pageElements.sceneBrandName.style.bottom = `${sceneHeightForBrand * pageElements.upDownFontPositionInput.value}px`;
			},
		);

	pageElements.leftRightFontPositionInput
		.addEventListener(
			'input',
			() => {
				pageElements.sceneBrandName.style.right = `${sceneWidthForBrand * pageElements.leftRightFontPositionInput.value}px`;
			},
		);

	pageElements.fontSizeInput
		.addEventListener(
			'input',
			() => {
				pageElements.sceneBrandName.style.fontSize = `${pageElements.fontSizeInput.value}px`;
			},
		);

	pageElements.scaleLogoInput
		.addEventListener(
			'input',
			() => {
				pageElements.scene.style.transform = `scale(${pageElements.scaleLogoInput.value})`;
			},
		);
});
