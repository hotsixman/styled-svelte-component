# Styled Svelte Component

You can create a styled component for svelte, which is responsive to props, so you can create a component that changes style depending on the situation. You can also use the event handler.

## install

`npm i styled-svelte-component`

## How to use

### For svelte 4

```svelte
<script>
import createSSC from 'styled-svelte-component/svelte4';

const SampleDiv = createSSC(
    'div', //tag name
    ({backgroundColor, color}) => `
        background-color:${backgroundColor};
        color: ${color};
    `, // A function which returns scss or css. You can use props here.
)
</script>

<SampleDiv backgroundColor="red" color="blue" on:click|once={() => {alert("true");}}>
    Snom is Ass
</SampleDiv>
```

### For svelte 5

```svelte
<script>
import createSSC from 'styled-svelte-component/svelte5';

const SampleDiv = createSSC(
    'div', //tag name
    ({backgroundColor, color}) => `
        background-color:${backgroundColor};
        color: ${color};
    `, // A function which returns scss or css. You can use props here.
)
</script>

<SampleDiv backgroundColor="red" color="blue" onclick={() => {alert("true");}}>
    Snom is Ass
</SampleDiv>
```