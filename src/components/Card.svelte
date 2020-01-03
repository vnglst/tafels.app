<style>
  .card {
    display: grid;
    background-color: var(--white);
    color: var(--grey-900);
    border-radius: 20px;
    margin: 3rem 1rem 0.5rem 1rem;
    padding: 0;
    box-shadow: var(--shadow-2);
    width: 28rem;
    min-height: 35rem;
  }

  .card::before {
    border-top: 8px solid var(--blue-050);
    background-color: var(--blue-050);
    border-radius: 20px 20px 0 0;
    margin: 0px 4px;
    height: 4px;
    display: block;
    content: "";
  }

  .header {
    margin: 0;
    padding: 4rem 0 0 0;
    font-size: 28px;
    text-align: center;
  }

  .footer {
    margin: 0;
    padding: 0;
  }
</style>

<div class="card">
  <div class="header">
    <slot name="header" />
  </div>
  <slot />
  <div class="footer">
    <slot name="footer" />
  </div>
</div>
