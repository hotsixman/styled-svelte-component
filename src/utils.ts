import type { StyleGenerator } from "./types.js";
import { compileString } from 'sass';

function hashCode(str: string): string {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return hash.toString(36);
}
export function createHash(tagName: string, restProps: Record<string, unknown>) {
    return hashCode(Date.now().toString(16) + tagName + JSON.stringify(restProps) + Math.random().toString(16))
}

export function removePropFromObject(obj: Record<string, unknown>, prop: string) {
    const { [prop]: _, ...rest } = obj;
    return { ...rest };
}

export function generateSASS(generateStyle: StyleGenerator<Record<string, unknown>>, tagName: string, hash: string, restProps: Record<string, unknown>) {
    const style = generateStyle(restProps);
    const css = `${tagName}.${`styled-svelte-${hash}`}{${style}}`;
    try {
        const sass = compileString(css, {silenceDeprecations: ['mixed-decls']});
        return sass.css;
    } catch {
        return css;
    }
}
export function generateCommonSASS(generateStyle: StyleGenerator<Record<string, unknown>>, tagName: string, hash: string, restProps: Record<string, unknown>) {
    const style = generateStyle(restProps);
    const css = `${tagName}.${`common-styled-svelte-${hash}`}{${style}}`;
    try {
        const sass = compileString(css, {silenceDeprecations: ['mixed-decls']});
        return sass.css;
    } catch {
        return css;
    }
}

export function findHTMLElement(ctx: any[]): HTMLElement | null {
    for (let i = 0; i < ctx.length; i++) {
        const e = ctx[i];
        if (e instanceof HTMLElement) {
            return e;
        }
    }
    return null;;
}