import type { StyleGenerator, PropsTypeDefinedStyledComponentWithCommonStyle, PropsTypeDefinedStyledComponent } from "./src/types.js";

throw new Error("You can't directly import 'styled-svelte-component' for version issue. You may import from 'styled-svelte-component/svelte4' or 'styled-svelte-component/svelte5'");

//@ts-expect-error
export function createSSC<Props extends Record<string, unknown>>(tagName: string, generateStyle: StyleGenerator<Props>): PropsTypeDefinedStyledComponent<Props>;
export function createSSC<Props extends Record<string, unknown>, CommonProps extends Record<string, unknown>>(tagName: string, generateStyle: StyleGenerator<Props>, generateCommonStyle: StyleGenerator<CommonProps>): PropsTypeDefinedStyledComponentWithCommonStyle<Props, CommonProps>;
export function createSSC<Props extends Record<string, unknown>, CommonProps extends Record<string, unknown>>(tagName: string, generateStyle: StyleGenerator<Props>, generateCommonStyle?: StyleGenerator<CommonProps>) { }

export default createSSC;