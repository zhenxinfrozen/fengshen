<template>
  <div>
    <section class="hero">
      <div class="hero-inner">
        <h1>封神·世界</h1>
        <p>探索封神宇宙的起源、重要事件与人物传记。一个面向学习与整理的 Wiki 平台。</p>
      </div>
    </section>

    <main class="content">
      <section id="overview" class="panel">
        <h2>Wiki 概览</h2>
        <p>此处汇总封神世界的背景知识、时间线与术语解释，便于快速查阅与学习。</p>
      </section>

      <section id="stories" class="panel">
        <h2>重要故事</h2>
        <div class="card-grid">
          <article class="card">
            <h3>天命之争</h3>
            <p>摘要：描述天命与人间英雄如何角力，推动封神的关键转折。</p>
          </article>
          <article class="card">
            <h3>仙魔之战</h3>
            <p>摘要：讲述仙人与魔族的冲突，以及对世界格局的长期影响。</p>
          </article>
        </div>
      </section>

      <section id="characters" class="panel">
        <h2>主要封神人物</h2>
        <div class="card-grid">
          <article class="person">
            <img :src="img1" alt="角色1" />
            <h3>姜子牙</h3>
          </article>
          <article class="person">
            <img :src="img2" alt="角色2" />
            <h3>哪吒</h3>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import img1 from '/assets/img/compressed/fengshen-UI-01-cut.webp'
import img2 from '/assets/img/compressed/fengshen-UI-02.webp'

export default {
  name: 'Home',
  data() {
    return { img1, img2 }
  }
}
</script>

<style scoped>
.hero { background:#fff; padding:28px 20px; border-radius:6px; margin-bottom:18px }
.hero-inner h1 { margin:0 0 8px 0 }
.panel { margin-bottom:20px }
.card-grid { display:flex; gap:12px }
.person img { width:420px; height:380px; object-fit:cover; border-radius:6px }
</style>
