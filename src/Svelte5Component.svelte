<script lang="ts">
    import { type Snippet } from "svelte";
    import { createHash } from "./utils.js";
    import { removePropFromObject } from "./utils.js";
    import { generateSASS } from "./utils.js";
    import type { StyleGenerator } from "./types.js";

    let {
        ...allProps
    }: Record<string,unknown> =
        $props();

    let tagName = $derived(allProps.tagName) as string;
    let children = $derived(allProps.children) as Snippet;
    let generateStyle = $derived(allProps.generateStyle) as StyleGenerator<Record<string, unknown>>;
    let commonHash = $derived(allProps.commonHash) as string | undefined;
    let restProps = $derived.by(() => {
        if(commonHash){
            const {tagName: _, children: __, generateStyle: ___, commonHash: ____, ...re} = allProps;
            return re;
        }
        else{
            const {tagName: _, children: __, generateStyle: ___, ...re} = allProps;
            return re;
        }
    })

    let hash = $derived.by(() => createHash(tagName, restProps));
    let className = $derived(`styled-svelte-${hash}` + (commonHash ? ` common-styled-svelte-${commonHash}` : '') + (restProps["class"] ? ` ${restProps['class']}` : ''));
    let rest = $derived.by(() => removePropFromObject(restProps, 'class'));
    let sass = $derived.by(() => generateSASS(generateStyle, tagName, hash, restProps));
</script>

<svelte:head>
    {@html `<style>${sass}</style>`}
</svelte:head>


<svelte:element this={tagName} class={className} {...rest}>
    {@render children?.()}
</svelte:element>