throw new Error("You can't directly import 'styled-svelte-component' for version issue. You may import from 'styled-svelte-component/svelte4' or 'styled-svelte-component/svelte5'")

//@ts-expect-error
export function createSSC(tagName: string, generateStyle: (props: Record<string, any>) => string): ConstructorOfATypedSvelteComponent{

}

export default createSSC;