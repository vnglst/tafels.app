  <script>
    import Card from "./Card.svelte";
  import IconCorrect from "./IconCorrect.svelte";
  import IconWrong from "./IconWrong.svelte"

    export let questions;
    export let results;
  </script>
  
  <style>
  
    ul {
    font-size: 18px;
    margin: 1em 0 3em 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  li {
    display:flex;
    align-items: center;
  }

  span {
    line-height: 1em;
    padding-left: 1em;
    padding: 0.5em;
  }
  
  </style>
  
    <Card>
      <h1 slot="header">RAPPORT</h1>
      <ul>
        {#each questions as question, idx}
          <li>{question.q} = {question.answer}
          <span>{#if results[idx]} 
            <IconCorrect />
            {:else}
             <IconWrong />
          {/if}</span>
        {/each}
      </ul>
    </Card>