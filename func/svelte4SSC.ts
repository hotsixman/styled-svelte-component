import Svelte4Component from "./Svelte4Component.svelte";

export function createSSC(tagName: string, generateStyle: (props: Record<string, any>) => string) {
    const StyledComponent = new Proxy(Svelte4Component, {
        construct(target, argArray, newTarget) {
            const props = argArray[0].props;
            props.tagName = tagName;
            props.generateStyle = generateStyle;
            const componentObject = Reflect.construct(target, argArray, newTarget);

            let addedEventListeners = false;
            const events: {eventName: keyof HTMLElementEventMap, handler: EventListenerOrEventListenerObject}[] = [];
            componentObject.$on = (eventName:keyof HTMLElementEventMap, handler: EventListenerOrEventListenerObject) => {
                events.push({eventName, handler})
            }

            const proxyComponentObject = new Proxy(componentObject, {
                get(target, key, receiver){
                    const value = Reflect.get(target, key, receiver);
                    if(key === "$$"){
                        const proxy$$ = new Proxy(value, {
                            get(target, key, receiver){
                                const value = Reflect.get(target, key, receiver);
                                if(key === "on_mount"){
                                    const proxyOnMount = new Proxy(value, {
                                        get(...args){
                                            const thisElement = componentObject.$$.ctx[0] as HTMLElement;
                                            if(thisElement && !addedEventListeners){
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
                                else{
                                    return value;
                                }
                            }
                        });

                        return proxy$$;
                    }
                    else{
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
                        const props = argArray[1];
                        props.tagName = tagName;
                        props.generateStyle = generateStyle;
                        return Reflect.apply(target, thisArg, argArray);
                    },
                })
                return objectProxy;
            }
            else {
                return object;
            }
        }
    })

    return StyledComponent as ConstructorOfATypedSvelteComponent;
}

export default createSSC;