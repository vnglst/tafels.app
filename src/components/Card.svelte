<style>
  .card {
    background-color: hsla(0, 0%, 0%, 0.4);
    border-radius: 20px;
    margin: 2em;
    box-shadow: 0 15px 35px 5px hsla(0, 0%, 0%, 0.5);
    width: 24rem;
    min-height: 30rem;
  }

  .header {
    background-color: hsla(0, 100%, 100%, 0.1);
    border-radius: 20px 20px 0 0;
    font-variant: small-caps;
    margin: 0;
    font-size: 1.75rem;
    text-align: center;
  }

  .footer {
    background-color: hsla(0, 0%, 0%, 0.5);
    border-radius: 0 0 20px 20px;
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
