<div class="card">
  <div class="header">
    <slot name="header" />
  </div>
  <slot />
  <div class="footer">
    <slot name="footer" />
  </div>
</div>

<style>
  .card {
    border-top: 10px solid var(--blue-050);
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
  .header {
    margin: 0;
    font-size: 28px;
    text-align: center;
    text-transform: uppercase;
  }

  .footer {
    margin: 0;
    padding: 0;
  }
</style>
