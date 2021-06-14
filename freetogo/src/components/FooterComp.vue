<template>

  <footer>
    <div class="go-up">
       <BtnScrollUp/>
    </div>    
    <div class="navfooter">

      <div class="footerlinks">
        <a href="#">Features</a>
        <a href="#">About</a>
        <a href="#">Testimonials</a>
        <a href="#">Contact</a>
        <a href="#">Download</a>
      </div>
      <div class="copyright">
        <p>1717 Harrison St, San Fransisco, CA 94103, USA</p>
        <p> © FreeToGo</p>
      </div>
    </div>

  </footer>

</template>


<script>
  import BtnScrollUp from './BtnScrollUp.vue'

  export default {
    name: 'FooterComp',
    components: {
        BtnScrollUp
      },

    data: () => ({
    
    }),
  }
</script>

<style scoped>

  footer{
    position: relative;
    margin-top: 5rem;
    width: 100%;
    bottom: 1.5em;
    justify-content: center;
    text-align: center;
    
  }

  .navfooter{
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
    max-height: 300px;
    width: 70%;

    background-color: #EEF1F6;
    padding-top: 4rem;
    padding-bottom: 2rem;
    border-radius: 25px;
    box-shadow: -5px 5px 10px rgba(202, 205, 209, 0.2),
                5px -5px 10px rgba(202, 205, 209, 0.2),
                -5px -5px 10px rgb(255, 255, 255),
                5px 5px 13px rgb(202, 205, 209),
                inset 1px 1px 2px rgba(255, 255, 255, 0.3),
                inset -1px -1px 2px rgba(202, 205, 209, 0.5);
  }

  .navfooter a{
    display: flex;
    text-decoration: none;
    color: #474E57;
    font-weight: bold;
  }

  .footerlinks{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .copyright{
    padding-top: 2rem;
  }

  .go-up{
    position: absolute;
    top: -30%;
    width: 100%;
  }

  @media (max-width: 1000px) {
    .footerlinks {
        flex-direction: column;
        margin: auto;
        align-items: center;
    }
}

</style>