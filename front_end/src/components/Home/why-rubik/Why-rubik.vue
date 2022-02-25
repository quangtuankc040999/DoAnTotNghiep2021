<template>
  <div class="why-rubik">
    <div class="text">
      <p class="tit">Why Rubik’s ?</p>
      <p class="te">
        The world’s most famous puzzle toy is both fun and mind-stretching, with
        its enduring challenge and compulsive twist and turn action. Try to
        incorporate a playful aspect that makes your product tactile and
        irresistible.
      </p>
    </div>
    <div class="block-why">
      <block
        :image="blogContent[0].url"
        :title="blogContent[0].title"
        :text="blogContent[0].text"
      />
      <block
        :image="blogContent[1].url"
        :title="blogContent[1].title"
        :text="blogContent[1].text"
      />
      <block
        :image="blogContent[2].url"
        :title="blogContent[2].title"
        :text="blogContent[2].text"
      />
      <block
        :image="blogContent[3].url"
        :title="blogContent[3].title"
        :text="blogContent[3].text"
      />
      <block
        :image="blogContent[4].url"
        :title="blogContent[4].title"
        :text="blogContent[4].text"
      />
    </div>
  </div>
</template>

<script>
import block from "./Why-rubik-block.vue";
export default {
  components: { block },
  data() {
    return {
      blogContent: [
        {
          url: "https://www.rubiksgift.com/wp-content/uploads/2019/12/playful.png",
          title: "Playful",
          text: "The desire to play and focus attention generates positive emotions, openness and the willingness to get involved.",
        },
        {
          url: "https://www.rubiksgift.com/wp-content/uploads/2019/12/used-by-top-brands.png",
          title: "Used by top brands",
          text: "Most of Fortune 500 use Rubik’s as a communication tool. Amazon, Google, Volkswagen and more.",
        },
        {
          url: "https://www.rubiksgift.com/wp-content/uploads/2019/12/multi-sensory.png",
          title: "Multi-sensory",
          text: "Touch, Hear, See. These mutually reinforcing perception channels increase the neural activity of the user’s brain by up to 1000%.",
        },
        {
          url: "https://www.rubiksgift.com/wp-content/uploads/2019/12/eco-friendly.png",
          title: "Eco",
          text: "For more than 20 years, we have been committed to producing responsibly and respectfully, following international social and environmental standards.",
        },
        {
          url: "https://www.rubiksgift.com/wp-content/uploads/2019/12/iconic.png",
          title: "Iconic",
          text: "Use the Original Rubik’s Cube. Rubik’s makes a strong statement, universally understood the world over, about smarts, creativity and perfect design",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.why-rubik {
  height: 880px;
  background-image: url("https://www.rubiksgift.com/wp-content/uploads/2019/12/Why-Rubiks-Section-BG.jpg");
  .text {
    height: 50% !important;
    width: 70% !important;
    margin: 0 auto;
    text-align: center;
    padding: 7%;
    color: white;
    .tit {
      font-weight: 800;
      font-size: 1.9rem !important;
      margin-bottom: 50px;
    }
    .te{
        font-size: 1,3rem;
    }
  
  }
  .block-why {
    display: flex;
    justify-content: center;
  }
}
</style>