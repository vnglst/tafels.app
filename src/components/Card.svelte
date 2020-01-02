<style>
  .card {
    display: grid;
    background-color: var(--white);
    color: var(--grey-1000);
    border-radius: 20px;
    margin: 3rem 3rem 0 3rem;
    padding: 0;
    box-shadow: var(--shadow-2);
    width: 28rem;
    min-height: 35rem;
  }

  .header {
    font-weight: 500;
    margin: 0;
    padding: 4rem 0 0 0;
    font-size: 28px;
    text-align: center;
  }

  .card::before {
    border-top: 8px solid var(--blue-400);
    background-color: var(--blue-400);
    border-radius: 20px 20px 0 0;
    margin: 0px 4px;
    display: block;
    content: "";
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
