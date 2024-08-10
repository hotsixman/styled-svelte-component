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

    let { ...allProps }: Record<string, unknown> = $props();

    let tagName = $derived(allProps.tagName) as string;
    let commonHash = $derived(allProps.commonHash) as string;
    let generateCommonStyle = $derived(
        allProps.generateCommonStyle,
    ) as StyleGenerator<Record<string, unknown>>;
    let restProps = $derived.by(() => getRestProps(allProps));
    let sass = $derived.by(() =>
        generateCommonSASS(generateCommonStyle, tagName, commonHash, restProps),
    );
</script>

<svelte:element this={"style"}>
    {sass}
</svelte:element>
