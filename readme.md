# Styled Svelte Component

You can create a styled component for svelte, which is responsive to props, so you can create a component that changes style depending on the situation. You can also use the event handler.

## install

`npm i styled-svelte-component`

## How to use

```svelte
<script>
import createSSC from 'styled-svelte-component';

const SampleDiv = createSSC(
    'div', //tag name
    ({backgroundColor, color}) => `
        background-color:${backgroundColor};
        color: ${color};
    `, // A function which returns css. You can use props here.
    ["click"], // Events that you want to use.
)
</script>

<SampleDiv backgroundColor="red" color="blue" on:click|once={() => {alert("true");}}>
    Snom is Ass
</SampleDiv>
```