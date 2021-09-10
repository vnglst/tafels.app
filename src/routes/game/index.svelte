<script>
  import Button from "../../ui/Button.svelte";
  import Page from "../../ui/Page.svelte";

  let numbers = [2, 6, 1, 2, 5, 3, 1, 2];

  let first = null;
  let second = null;
  let result1 = null;
  let result2 = null;

  $: console.log(
    numbers[first],
    "x",
    numbers[second],
    "=",
    numbers[result1],
    numbers[result2]
  );
  $: console.log(getStatus());

  function addNumber() {
    const newNumber = Math.floor(Math.random() * 10);
    numbers = [...numbers, newNumber];
  }

  setInterval(addNumber, 4000);

  function removeIdxsFromArray(arr, idxs) {
    return arr.filter((_, i) => idxs.findIndex((idx) => idx === i) === -1);
  }

  function getStatus() {
    const result = Number(
      `${numbers[result1]}${result2 !== null ? numbers[result2] : ""}`
    );
    const isCorrect = numbers[first] * numbers[second] === result;
    if (isCorrect) return "correct";

    const isValid = numbers[first] * numbers[second] >= result;
    if (isValid) return "valid";

    return "wrong";
  }

  function handleClick(i) {
    if (i === first) {
      first = null;
      return;
    }

    if (i === second) {
      second = null;
      return;
    }

    if (i === result1) {
      result1 = null;
      return;
    }

    if (first === null) {
      first = i;
      return;
    }
    if (second === null) {
      second = i;
      return;
    }

    if (result1 === null) {
      result1 = i;
      if (getStatus() === "valid") return;
    }

    if (getStatus() === "correct") {
      handleCorrect();
      return;
    }

    if (result2 === null) {
      result2 = i;
    }

    if (getStatus() === "correct") {
      handleCorrect();
    } else {
      handleWrong();
    }
  }

  function handleCorrect() {
    console.log("correct");
    numbers = removeIdxsFromArray(numbers, [first, second, result1, result2]);
    first = null;
    second = null;
    result1 = null;
    result2 = null;
  }

  function handleWrong() {
    console.log("wrong");
    first = null;
    second = null;
    result1 = null;
    result2 = null;
    addNumber();
    addNumber();
    addNumber();
  }

</script>

<Page>
  <div class="container">
    <h1 class="text-4xl m-5 p-0 mt-16 font-bold text-center">
      {numbers[first] || '?'}
      x
      {numbers[second] || '?'}
      =
      {numbers[result1] || '?'}
      {numbers[result2] || ''}
    </h1>

    <div class="grid">
      {#each numbers as number, i}
        <Button
          primary={i === first}
          success={i === second}
          danger={i === result1}
          on:click={() => handleClick(i)}
        >
          {number}
        </Button>
      {/each}
    </div>
  </div>
</Page>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(5, 5rem);
    grid-auto-rows: 5rem;
    grid-gap: 2rem;
    margin: 2rem auto;
  }

</style>
