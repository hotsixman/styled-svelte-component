<script lang="ts">
    import { type Snippet } from "svelte";
    import {compileString} from 'sass';
    import { browser } from "$app/environment";

    let {
        ...allProps
    }: Record<string,unknown> =
        $props();

    let tagName = $derived(allProps.tagName) as string;
    let children = $derived(allProps.children) as Snippet;
    let generateStyle = $derived(allProps.generateStyle) as (props:Record<string, unknown>) => string;
    let restProps = $derived.by(() => {
        const {tagName: _, children: __, generateStyle: ___, ...re} = allProps;
        return re;
    })

    function hashCode(str: string): string {
        let hash = 0;
        for (let i = 0, len = str.length; i < len; i++) {
            let chr = str.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0;
        }
        return hash.toString(36);
    }
    function createHash(){
        return hashCode(Date.now().toString(16) + tagName + JSON.stringify(restProps))
    }
    function removePropFromObject(obj: Record<string, unknown>, prop: string) {
        const { [prop]: _, ...rest } = obj;
        return { ...rest };
    }
    function generateSASS(hash: string){
        const css = generateStyle(restProps);
        try{
            const sass = compileString(css);
            return `${tagName}.${`styled-svelte-${hash}`}{${sass.css}}`;
        }
        catch{
            return `${tagName}.${`styled-svelte-${hash}`}{${css}}`;
        }
    }

    let hash = createHash();
    let className = $derived(`styled-svelte-${hash}` + (restProps["class"] ? ` ${restProps['class']}` : ''));
    let rest = $derived.by(() => removePropFromObject(restProps, 'class'));
    let sass = $derived.by(() => {
        return generateSASS(hash)
    })
</script>

<svelte:element this="style">
    {sass}
</svelte:element>


<svelte:element this={tagName} class={className} {...rest}>
    {@render children?.()}
</svelte:element>