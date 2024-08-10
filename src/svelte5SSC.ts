//@ts-nocheck
import Svelte5CommonStyle from "./Svelte5CommonStyle.svelte";
import Svelte5Component from "./Svelte5Component.svelte";
import { type StyleGenerator, type PropsTypeDefinedStyledComponent, type PropsTypeDefinedStyledComponentWithCommonStyle } from "./types.js";
import { createHash } from "./utils.js";

export function createSSC<Props extends Record<string, unknown>>(tagName: string, generateStyle: StyleGenerator<Props>): PropsTypeDefinedStyledComponent<Props>;
export function createSSC<Props extends Record<string, unknown>, CommonProps extends Record<string, unknown>>(tagName: string, generateStyle: StyleGenerator<Props>, generateCommonStyle: StyleGenerator<CommonProps>): PropsTypeDefinedStyledComponentWithCommonStyle<Props, CommonProps>;
export function createSSC<Props extends Record<string, unknown>, CommonProps extends Record<string, unknown>>(tagName: string, generateStyle: StyleGenerator<Props>, generateCommonStyle?: StyleGenerator<CommonProps>) {
    let commonHash: string | undefined = undefined;
    if (generateCommonStyle) {
        commonHash = createHash(tagName, { tagName: tagName });
    }

    const StyledComponent = new Proxy(Svelte5Component, {
        apply(target, thisArg, argArray) {
            const props = argArray[1] ?? {};
            props.tagName = tagName;
            props.generateStyle = generateStyle;
            props.commonHash = commonHash;
            argArray[1] = props;

            return Reflect.apply(target, thisArg, argArray);
        }
    })

    if (generateCommonStyle) {
        const CommonStyleComponent = new Proxy(Svelte5CommonStyle, {
            apply(target, thisArg, argArray) {
                const props = argArray[1] ?? {};
                props.tagName = tagName;
                props.generateCommonStyle = generateCommonStyle;
                props.commonHash = commonHash;
                argArray[1] = props;

                return Reflect.apply(target, thisArg, argArray);
            }
        });
        StyledComponent.common = CommonStyleComponent;
    }

    return StyledComponent;
}

export default createSSC;