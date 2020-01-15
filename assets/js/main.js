document.addEventListener('DOMContentLoaded', () => {
    const pageElements = {
        scene: () => document.querySelector('.logo-scene-container'),
        sceneBackground: () => document.querySelector('.background-area'),
        sceneLogo: () => document.querySelector('.logo-area'),
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

    const calculateOneToHundredValueOfScene = () => ([pageElements.scene().getBoundingClientRect().width / 100, pageElements.scene().getBoundingClientRect().height / 100])
    const [sceneWidth, sceneHeight] = calculateOneToHundredValueOfScene();

    // const eventListenerForInputChanges = (element, func) => element.addEventListener('input', func);

    // Object.keys(pageElements)
    // .filter(element => element.includes('Input'))
    // .forEach(inputElement => {
    //     eventListenerForInputChanges(
    //         pageElements[inputElement], 
    //         () => console.log(pageElements[inputElement].value
    //             ));
    // });

    pageElements.upDownLogoPositionInput()
    .addEventListener(
        'input', 
        () => {
            pageElements.sceneLogo().style.top = `${(sceneHeight * pageElements.upDownLogoPositionInput().value)}px`;
        },

    );
});