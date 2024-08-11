//@ts-nocheck
import { createHash, findHTMLElement } from "./utils.js";
import Svelte4Component from "./Svelte4Component.svelte";
import { type StyleGenerator, type PropsTypeDefinedStyledComponent, type PropsTypeDefinedStyledComponentWithCommonStyle } from "./types.js";
import Svelte4CommonStyle from "./Svelte4CommonStyle.svelte";

export function createSSC<Props extends Record<string, unknown>>(tagName: string, generateStyle: StyleGenerator<Props>): PropsTypeDefinedStyledComponent<Props>;
export function createSSC<Props extends Record<string, unknown>, CommonProps extends Record<string, unknown>>(tagName: string, generateStyle: StyleGenerator<Props>, generateCommonStyle: StyleGenerator<CommonProps>): PropsTypeDefinedStyledComponentWithCommonStyle<Props, CommonProps>;
export function createSSC<Props extends Record<string, unknown>, CommonProps extends Record<string, unknown>>(tagName: string, generateStyle: StyleGenerator<Props>, generateCommonStyle?: StyleGenerator<CommonProps>) {
    let commonHash: string | undefined = undefined;
    if (generateCommonStyle) {
        commonHash = createHash(tagName, { tagName: tagName })
    }

    const styledComponentData = {
        tagName,
        generateStyle,
        generateCommonStyle
    }

    let common = undefined;
    if (generateCommonStyle) {
        const CommonStyleComponent = new Proxy(Svelte4CommonStyle, {
            construct(target, argArray, newTarget) {
                const props = argArray[0].props ?? {};
                props.tagName = tagName;
                props.generateCommonStyle = generateCommonStyle;
                props.commonHash = commonHash;
                argArray[0].props = props;

                const componentObject = Reflect.construct(target, argArray, newTarget);
                return componentObject;
            },
            get(target, key, receiver) {
                const object = Reflect.get(target, key, receiver);
                if (key === "$$render" || key === "render") {
                    const objectProxy = new Proxy(object, {
                        apply(target, thisArg, argArray) {
                            const props = argArray[1] ?? {};
                            props.tagName = tagName;
                            props.generateCommonStyle = generateCommonStyle;
                            props.commonHash = commonHash;
                            argArray[1] = props;

                            return Reflect.apply(target, thisArg, argArray);
                        },
                    })
                    return objectProxy;
                }
                else {
                    return object;
                }
            }
        });

        common = CommonStyleComponent;
    }

    const StyledComponent = new Proxy(Svelte4Component, {
        construct(target, argArray, newTarget) {
            const props = argArray[0].props ?? {};
            props.tagName = tagName;
            props.generateStyle = generateStyle;
            props.commonHash = commonHash;
            argArray[0].props = props;

            const componentObject = Reflect.construct(target, argArray, newTarget);

            let addedEventListeners = false;
            const events: { eventName: keyof HTMLElementEventMap, handler: EventListenerOrEventListenerObject }[] = [];
            componentObject.$on = (eventName: keyof HTMLElementEventMap, handler: EventListenerOrEventListenerObject) => {
                events.push({ eventName, handler })
            }

            const proxyComponentObject = new Proxy(componentObject, {
                get(target, key, receiver) {
                    const value = Reflect.get(target, key, receiver);
                    if (key === "$$") {
                        const proxy$$ = new Proxy(value, {
                            get(target, key, receiver) {
                                const value = Reflect.get(target, key, receiver);
                                if (key === "on_mount") {
                                    const proxyOnMount = new Proxy(value, {
                                        get(...args) {
                                            const thisElement = findHTMLElement(componentObject.$$.ctx);
                                            if (thisElement && !addedEventListeners) {
                                                events.forEach((event) => {
                                                    thisElement.addEventListener(event.eventName, event.handler, true);
                                                });
                                                addedEventListeners = true;
                                            }
                                            return Reflect.get(...args)
                                        }
                                    })
                                    return proxyOnMount;
                                }
                                else {
                                    return value;
                                }
                            }
                        });

                        return proxy$$;
                    }
                    else {
                        return value;
                    }
                }
            })
            return proxyComponentObject;
        },
        get(target, key, receiver) {
            const object = Reflect.get(target, key, receiver);
            if (key === "$$render" || key === "render") {
                const objectProxy = new Proxy(object, {
                    apply(target, thisArg, argArray) {
                        const props = argArray[1] ?? {};
                        props.tagName = tagName;
                        props.generateStyle = generateStyle;
                        props.commonHash = commonHash;
                        argArray[1] = props;

                        return Reflect.apply(target, thisArg, argArray);
                    },
                })
                return objectProxy;
            }
            else if(key === "styledComponentData"){
                return styledComponentData;
            }
            else if(key === "common"){
                return common;
            }
            else {
                return object;
            }
        }
    })

    return StyledComponent as PropsTypeDefinedStyledComponent<Props>;
}

export default createSSC;