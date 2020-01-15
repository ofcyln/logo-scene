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

    const calculateOneToHundredStepOfScene = () => ([
            (pageElements.scene().getBoundingClientRect().width - pageElements.sceneLogo().offsetWidth) / 100, 
            (pageElements.scene().getBoundingClientRect().height - pageElements.sceneLogo().offsetHeight) / 100,
        ]);
    
    const [sceneWidth, sceneHeight] = calculateOneToHundredStepOfScene();

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
            pageElements.sceneLogo().style.top = `${sceneHeight * pageElements.upDownLogoPositionInput().value}px`;
        },
    );

    pageElements.leftRightLogoPositionInput()
    .addEventListener(
        'input', 
        () => {
            pageElements.sceneLogo().style.left = `${sceneWidth * pageElements.leftRightLogoPositionInput().value}px`;
        },
    );

    
});