/* @flow */
/** @jsx node */

import { svgToBase64 } from 'belter/src';
import { node, html, type ElementNode, type ComponentNode } from 'jsx-pragmatic/src';

import { LOGO_CLASS, LOGO_COLOR } from '../constants';

type SVGProps = {|
    svg : ElementNode,
    [ string ] : string
|};

export function SVG(props : SVGProps) : ElementNode {
    let { svg, ...otherProps } = props;

    if (!svg) {
        throw new TypeError(`Expected svg prop`);
    }
    
    svg = svg.render(html());

    if (typeof svg !== 'string') {
        throw new TypeError(`Expected svg prop to be a string or jsx node`);
    }

    return (
        <img src={ svgToBase64(svg) } { ...otherProps } />
    );
}

export type SVGLogoProps = {|
    render : () => ElementNode,
    name : string,
    logoColor? : $Values<typeof LOGO_COLOR>
|};

export function SVGLogo({ render, name, logoColor } : SVGLogoProps) : ComponentNode<SVGLogoProps> {
    return (
        <SVG
            svg={ render() }
            alt={ name }
            class={ `${ LOGO_CLASS.LOGO } ${ LOGO_CLASS.LOGO }-${ name } ${ logoColor ? `${ LOGO_CLASS.LOGO_COLOR }-${ logoColor }` : '' }` }
        />
    );
}

export type SVGCardLogoProps = {|
    render : () => ElementNode,
    name : string
|};

export function SVGCardLogo({ render, name } : SVGCardLogoProps) : ComponentNode<SVGCardLogoProps> {
    return (
        <SVG

            svg={ render() }
            alt={ name }
            class={ `${ LOGO_CLASS.CARD } ${ LOGO_CLASS.CARD }-${ name }` }
        />
    );
}
