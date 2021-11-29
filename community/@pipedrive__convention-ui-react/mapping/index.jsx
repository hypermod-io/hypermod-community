// migrating component props and values according to the
// https://cui.pipedrive.tools/v5/?path=/docs/documentation-migrating-from-cui4--badge

// in someComponent.jsx
import { Button } from '@pipedrive/convention-ui-react';

export const A = () => {
    return (
        <>
            <Button color="green" />
            {/* replace with */}
            <Button variant="active" />
        </>
    )
}

_______________________________________
// direct usage of tokens in js/ts/jsx/tsx files 
////// index.tsx / index.jsx file

import colors from '@pipedrive/convention-ui-css/dist/amd/colors.js'; // ${colors['$color-black-hex-4']} // **************** use mapping.js.colors ****************
import colors from '@pipedrive/convention-ui-css/dist/json/colors.json'; // // ${colors['$color-black-hex-4']} // **************** use mapping.js.colors ****************

import colors from '@pipedrive/convention-ui-css/dist/json/colors-conventioned.json'; // **************** use mapping.js.colorsConventioned ****************
import { colors } from '@pipedrive/convention-ui-css/dist/js/variables.js'; // colors.white // **************** use mapping.js.colorsConventioned ****************


export const GlobalStyle = createGlobalStyle`
	body {
		font: ${fonts['$font-body']};
		background-color: ${colors['$color-black-hex-4']};
		color: ${colors.black};
        color: ${colors['$color-black-hex-4']};
        color: ${colors.textPrimary};
    
        // old version 1
        padding: ${spacings['$spacing-l']}; 
        // old version 2
        padding: ${spacings.spacingL};
        // replacement for both 
        padding: ${spacings.spacing50}
	}
	`
______________________________________

// changing token usages in pcss/sass files 
// *.pcss / *.sass / *.postcss file
// **************** use mapping.css.colors ****************

@import '@pipedrive/convention-ui-css/dist/postcss/colors.postcss';
.modal {
    // old
    background - color: $color - black - hex - 4;
    // new
    background - color: var(--pd - color - surface - foreground);
}

// according to
// token value map
// https://docs.google.com/spreadsheets/d/1OXfLPYhNQ-oRu-D4vFxe-GhQoFpJnHBsPLFwHf94ev4/edit#gid=1301173850



// actions items 
// - add fonts @martin
// - add elevations @martin
// - export csv -> add it here @kipras 
// - create github repo @martin
// - add mapping of import paths @martin 