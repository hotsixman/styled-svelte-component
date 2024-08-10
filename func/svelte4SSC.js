import Svelte4Component from "./Svelte4Component.svelte";
export function createSSC(tagName, generateStyle) {
    const StyledComponent = new Proxy(Svelte4Component, {
        construct(target, argArray, newTarget) {
            const props = argArray[0].props;
            props.tagName = tagName;
            props.generateStyle = generateStyle;
            const object = Reflect.construct(target, argArray, newTarget);
            const events = [];
            object.$on = (eventName, handler) => {
                events.push({ eventName, handler });
            };
            const proxyObject = new Proxy(object, {
                get(target, key, receiver) {
                    const value = Reflect.get(target, key, receiver);
                    if (key === "$$") {
                        const proxy$$ = new Proxy(value, {
                            get(target, key, receiver) {
                                const value = Reflect.get(target, key, receiver);
                                if (key === "on_mount") {
                                    const proxyOnMount = new Proxy(value, {
                                        get(...args) {
                                            const thisElement = object.$$.ctx[0];
                                            if (thisElement) {
                                                events.forEach((event) => {
                                                    thisElement.addEventListener(event.eventName, event.handler, true);
                                                });
                                            }
                                            return Reflect.get(...args);
                                        }
                                    });
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
            });
            return proxyObject;
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
                });
                return objectProxy;
            }
            else {
                return object;
            }
        }
    });
    return StyledComponent;
}
export default createSSC;
//# sourceMappingURL=svelte4SSC.js.map