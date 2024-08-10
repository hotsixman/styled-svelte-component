<script lang="ts">
    import { compileString } from "sass";

    let thisElement: HTMLElement;

    function getRestProps(props: Record<string, unknown>) {
        const { tagName: _, children: __, generateStyle: ___, ...re } = props;
        return re;
    }

    $: tagName = $$props.tagName as string;
    let generateStyle = $$props.generateStyle as (
        props: Record<string, unknown>,
    ) => string;
    $: generateStyle = $$props.generateStyle as (
        props: Record<string, unknown>,
    ) => string;
    $: restProps = getRestProps($$props);

    function hashCode(str: string): string {
        let hash = 0;
        for (let i = 0, len = str.length; i < len; i++) {
            let chr = str.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0;
        }
        return hash.toString(36);
    }
    function createHash() {
        return hashCode(
            Date.now().toString(16) + tagName + JSON.stringify(restProps),
        );
    }
    function removePropFromObject(obj: Record<string, unknown>, prop: string) {
        const { [prop]: _, ...rest } = obj;
        return { ...rest };
    }
    function generateSASS(gen: Function, hash: string) {
        const style = gen(restProps);
        const css = `${tagName}.${`styled-svelte-${hash}`}{${style}}`;
        try {
            const sass = compileString(css);
            return sass.css;
        } catch {
            return css;
        }
    }

    let hash = createHash();
    $: className =
        `styled-svelte-${hash}` +
        (restProps["class"] ? ` ${restProps["class"]}` : "");
    $: rest = removePropFromObject(restProps, "class");
    $: sass = generateSASS(generateStyle, hash);
</script>

<svelte:element this="style">
    {sass}
</svelte:element>

<svelte:element this={tagName} class={className} {...rest} bind:this={thisElement}>
    <slot />
</svelte:element>
