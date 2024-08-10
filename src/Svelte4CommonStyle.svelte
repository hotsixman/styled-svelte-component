<script lang="ts">
    import type { StyleGenerator } from "./types.js";
    import { generateCommonSASS } from "./utils.js";

    function getRestProps(props: Record<string, unknown>) {
        const {
            tagName: _,
            commonHash: __,
            generateCommonStyle: ___,
            ...re
        } = props;
        return re;
    }

    $: tagName = $$props.tagName as string;
    $: commonHash = $$props.commonHash as string;
    $: generateCommonStyle = $$props.generateCommonStyle as StyleGenerator<Record<string, unknown>>;
    $: restProps = getRestProps($$props);
    $: sass = generateCommonSASS(generateCommonStyle, tagName, commonHash, restProps);
</script>

<svelte:element this="style">
    {sass}
</svelte:element>