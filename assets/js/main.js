document.addEventListener('DOMContentLoaded', () => {
    const pageElements = {
        scene: () => document.querySelector('.logo-scene-container'),
        sceneBackground: () => document.querySelector('.background-area'),
        sceneLogo: () => document.querySelector('.logo-area img'),
        sceneBrandName: () => document.querySelector('.brand-name-area'),
        backgroundColorInput: () => document.querySelector('#backgroundColor'),
        upDownLogoPositionInput: () => document.querySelector('#updDown'),
        leftRightLogoPositionInput: () => document.querySelector('#leftRight'),
        brandNameInput: () => document.querySelector('#brandName'),
        fontTypeInput: () => document.querySelector('#fontTypeSelect'),
        fontSizeInput: () => document.querySelector('#fontSize'),
        upDownFontPositionInput: () => document.querySelector('#updDownFont'),
        leftRightFontPositionInput: () => document.querySelector('#leftRightFont'),
        scaleLogoInput: () => document.querySelector('#scaleLogo'),
    };

    const calculateOneToHundredStepOfScene = (element) => ([
            (pageElements.scene().getBoundingClientRect().width - element.offsetWidth) / 100, 
            (pageElements.scene().getBoundingClientRect().height - element.offsetHeight) / 100,
        ]);
    
    const [sceneWidthForLogo, sceneHeightForLogo] = calculateOneToHundredStepOfScene(pageElements.sceneLogo());
    const [sceneWidthForBrand, sceneHeightForBrand] = calculateOneToHundredStepOfScene(pageElements.sceneBrandName());

    // const eventListenerForInputChanges = (element, func) => element.addEventListener('input', func);

    // Object.keys(pageElements)
    // .filter(element => element.includes('Input'))
    // .forEach(inputElement => {
    //     eventListenerForInputChanges(
    //         pageElements[inputElement], 
    //         () => console.log(pageElements[inputElement].value
    //             ));
    // });

    pageElements.backgroundColorInput()
    .addEventListener(
        'change', 
        () => {
            pageElements.sceneBackground().style.backgroundColor = `${pageElements.backgroundColorInput().value}`;
        },
    );

    pageElements.upDownLogoPositionInput()
    .addEventListener(
        'input', 
        () => {
            pageElements.sceneLogo().style.top = `${sceneHeightForLogo * pageElements.upDownLogoPositionInput().value}px`;
        },
    );

    pageElements.leftRightLogoPositionInput()
    .addEventListener(
        'input', 
        () => {
            pageElements.sceneLogo().style.left = `${sceneWidthForLogo * pageElements.leftRightLogoPositionInput().value}px`;
        },
    );

    pageElements.brandNameInput()
    .addEventListener(
        'input', 
        () => {
            pageElements.sceneBrandName().innerHTML = `${pageElements.brandNameInput().value}`;
        },
    );

    pageElements.fontTypeInput()
    .addEventListener(
        'change', 
        () => {
            pageElements.sceneBrandName().style.fontFamily = pageElements.fontTypeInput().value;
        },
    );

    pageElements.upDownFontPositionInput()
    .addEventListener(
        'input', 
        () => {
            pageElements.sceneBrandName().style.bottom = `${sceneHeightForBrand * pageElements.upDownFontPositionInput().value}px`;
        },
    );

    pageElements.leftRightFontPositionInput()
    .addEventListener(
        'input', 
        () => {
            pageElements.sceneBrandName().style.right = `${sceneWidthForBrand * pageElements.leftRightFontPositionInput().value}px`;
        },
    );

    pageElements.fontSizeInput()
    .addEventListener(
        'input', 
        () => {
            pageElements.sceneBrandName().style.fontSize = `${pageElements.fontSizeInput().value}px`;
        },
    );

    pageElements.scaleLogoInput()
    .addEventListener(
        'input', 
        () => {
            pageElements.scene().style.transform = `scale(${pageElements.scaleLogoInput().value})`;
        },
    );
});