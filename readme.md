# Styled Svelte Component

> [!WARNING]  
> There are some problems in svelte5. Use [styled-svelte5](https://github.com/hotsixman/styled-svelte5) if you are using svelte5.

You can create a styled component for svelte, which is responsive to props, so you can create a component that changes style depending on the situation. You can also use the event handler.

## install

`npm i styled-svelte-component`

## How to use

### For svelte 4

```svelte
<script lang="ts">
import createSSC from 'styled-svelte-component/svelte4';

const SampleDiv = createSSC<{color:string}>( //You can set types of props here.
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
<script lang="ts">
import createSSC from 'styled-svelte-component/svelte5';

const SampleDiv = createSSC<{color:string}>( //You can set types of props here.
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

### Common Style

For example in Svelte 4: 

```svelte
<script lang="ts">
import createSSC from 'styled-svelte-component/svelte4';

const SampleDiv = createSSC<{color:string}, {hoverColor: string}>( //You can set types of props here.
    'div', //tag name
    ({backgroundColor}) => `
        background-color: ${backgroundColor};
    `, // A function which returns scss or css. You can use props here.
    ({hoverColor}) => `
        &:hover{
            color: ${hoverColor};
        }
    ` // Style for all `SampleDiv` components;
)
</script>

<SampleDiv.common hoverColor="purple"/>

<!-- Red background color and purple text color when hover -->
<SampleDiv backgroundColor="red">
    Snom is Ass
</SampleDiv>

<!-- Blue background color and purple text color when hover -->
<SampleDiv backgroundColor="blue">
    Snom is Ass
</SampleDiv>
```
