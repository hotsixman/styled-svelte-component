import Svelte5Component from "./Svelte5Component.svelte";

export function createSSC(tagName: string, generateStyle: (props: Record<string, any>) => string) {
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

    return StyledComponent as unknown as ConstructorOfATypedSvelteComponent;
}

export default createSSC;