<script lang="ts">
    import { createHash } from "./utils.js";
    import type {StyleGenerator} from './types.js';
    import { removePropFromObject, generateSASS } from "./utils.js";

    let thisElement: HTMLElement;

    function getRestProps(props: Record<string, unknown>) {
        if (props.commonHash !== undefined) {
            const {
                tagName: _,
                generateStyle: __,
                ...re
            } = props;
            return re;
        } else {
            const {
                tagName: _,
                commonHash: __,
                generateStyle: ___,
                ...re
            } = props;
            return re;
        }
    }

    $: tagName = $$props.tagName as string;
    $: generateStyle = $$props.generateStyle as StyleGenerator<Record<string, unknown>>;
    $: commonHash = $$props.commonHash as string | undefined;
    $: restProps = getRestProps($$props);

    let hash = createHash(tagName, restProps);
    $: className =
        `styled-svelte-${hash}` +
        (commonHash ? ` common-styled-svelte-${commonHash}` : "")+
        (restProps["class"] ? ` ${restProps["class"]}` : "");
    $: rest = removePropFromObject(restProps, "class");
    $: sass = generateSASS(generateStyle, tagName, hash, restProps);
</script>

<svelte:element this="style">
    {sass}
</svelte:element>

<svelte:element
    this={tagName}
    class={className}
    {...rest}
    bind:this={thisElement}
>
    <slot />
</svelte:element>
