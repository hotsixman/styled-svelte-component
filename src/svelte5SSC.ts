//@ts-nocheck
import Svelte5Component from "./Svelte5Component.svelte";
import { PropsTypeDefinedStyledComponent } from "./types.js";

export function createSSC<Props extends Record<string, unknown>>(tagName: string, generateStyle: (props: Record<string, any>) => string) {
    const StyledComponent = new Proxy(Svelte5Component, {
        apply(target, thisArg, argArray) {
            const props = argArray[1];
            props.tagName = tagName;
            props.generateStyle = generateStyle;
            return Reflect.apply(target, thisArg, argArray);
        },
        get(target, props, receiver) {
            return Reflect.get(target, props, receiver)
        }
    })

    return StyledComponent as unknown as PropsTypeDefinedStyledComponent<Props>
}

export default createSSC;