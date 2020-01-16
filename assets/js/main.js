document.addEventListener('DOMContentLoaded', () => {
    const executePageFunctionality = (() => {
        const HUNDRED_PERCENT = 100;

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
            (pageElements.scene.getBoundingClientRect().width - element.offsetWidth) / HUNDRED_PERCENT,
            (pageElements.scene.getBoundingClientRect().height - element.offsetHeight) / HUNDRED_PERCENT,
        ]);
    
        const [sceneWidthForLogo, sceneHeightForLogo] = calculateOneToHundredStepOfScene(pageElements.sceneLogo);
        const [sceneWidthForBrand, sceneHeightForBrand] = calculateOneToHundredStepOfScene(pageElements.sceneBrandName);
    
        const setEventListeners = () => {
            const eventListenerForInputChanges = (element, listenerType, callbackFuncion) => element.addEventListener(listenerType, callbackFuncion);
    
            Object.keys(pageElements)
            .filter(element => element.includes('Input'))
            .forEach(inputElement => {        
                if (inputElement === 'backgroundColorInput' || inputElement === 'fontColorInput') {
                    inputElement === 'backgroundColorInput' 
                        ? eventListenerForInputChanges(pageElements[inputElement], 'change', () => pageElements.sceneBackground.style.backgroundColor = `${pageElements[inputElement].value}`) 
                        : eventListenerForInputChanges(pageElements[inputElement], 'change', () => pageElements.sceneBrandName.style.color = `${pageElements[inputElement].value}`);
                } else {
                    const events = {
                        upDownLogoPositionInput: () => pageElements.sceneLogo.style.top = `${sceneHeightForLogo * pageElements.upDownLogoPositionInput.value}px`,
                        leftRightLogoPositionInput: () => pageElements.sceneLogo.style.left = `${sceneWidthForLogo * pageElements.leftRightLogoPositionInput.value}px`,
                        brandNameInput: () => pageElements.sceneBrandName.innerHTML = `${pageElements.brandNameInput.value}`,
                        fontTypeInput: () => pageElements.sceneBrandName.style.fontFamily = pageElements.fontTypeInput.value,
                        upDownFontPositionInput: () => pageElements.sceneBrandName.style.bottom = `${sceneHeightForBrand * pageElements.upDownFontPositionInput.value}px`,
                        leftRightFontPositionInput: () => pageElements.sceneBrandName.style.right = `${sceneWidthForBrand * pageElements.leftRightFontPositionInput.value}px`,
                        fontSizeInput: () => pageElements.sceneBrandName.style.fontSize = `${pageElements.fontSizeInput.value}px`,
                        scaleLogoInput: () => pageElements.scene.style.transform = `scale(${pageElements.scaleLogoInput.value})`,
                    };
        
                    eventListenerForInputChanges(
                        pageElements[inputElement],
                        'input',
                        events[inputElement]
                    );
                }
            });
        }
    
        setEventListeners();
    })();
});
