<template>
  <div id="app">
    <header class="topbar full">
      <div class="topbar-left">
        <img class="topbar-logo" src="/assets/img/project-UI/fengshen-logo.png" alt="logo" />
        <span class="topbar-title">fengshen.world</span>
      </div>
      <div class="topbar-right">
        <div class="search"><input placeholder="搜索..."/></div>
        <div class="tools">🔍 ⚙️</div>
      </div>
    </header>

    <div class="app-shell">
      <aside class="left-nav">
        <!-- top quick buttons like Wiki.js -->
        <div class="nav-top-buttons">
          <router-link to="/" class="big-btn home" title="Home">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          </router-link>
          <router-link to="/wiki" class="big-btn browse" title="Browse">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
            <span>Browse</span>
          </router-link>
        </div>
        <!-- keep a small spacer so left-nav starts below topbar -->
        <div class="left-spacer"></div>
        <ul class="menu">
          <li v-for="group in menu" :key="group.id">
            <button class="group-title" @click="toggleGroup(group.id)">
              <span>{{ group.title }}</span>
              <span class="chev">{{ openGroups[group.id] ? '▼' : '▶' }}</span>
            </button>
            <ul class="group-items" v-show="openGroups[group.id]">
              <li v-for="child in group.children" :key="child.path">
                <router-link :to="child.path">{{ child.title }}</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </aside>

      <div class="main-area">
        <div class="page-body">
          <main class="content">
            <router-view />
          </main>

          <aside class="right-aside">
            <div class="toc">目录（待生成）</div>
            <div class="meta">最近更新：2021年1月1日</div>
          </aside>
        </div>

        <footer class="site-footer">
          <small>fengshen.world — Wiki 汇总 &amp; 文档集合</small>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import menu from './data/menu.js'
import img1 from '/assets/img/compressed/fengshen-UI-01-cut.webp'
import img2 from '/assets/img/compressed/fengshen-UI-02.webp'

export default {
  name: 'App',
  setup() {
    const menuOpen = ref(false)
    const openGroups = ref({})

    // initialize open groups based on current location
    onMounted(() => {
      const path = window.location.pathname + (window.location.hash || '')
      menu.forEach(g => {
        const match = g.children.some(c => c.path && path.startsWith(new URL(c.path, window.location.origin).pathname))
        openGroups.value[g.id] = match
      })
      // if nothing matched, open first group by default
      const anyOpen = Object.values(openGroups.value).some(Boolean)
      if (!anyOpen && menu.length) openGroups.value[menu[0].id] = true
    })

    const toggle = () => (menuOpen.value = !menuOpen.value)
    const toggleGroup = (id) => {
      openGroups.value[id] = !openGroups.value[id]
    }

    return { menuOpen, toggle, openGroups, toggleGroup, img1, img2, menu }
  }
}
</script>

<style scoped>
/* Layout shell */
.app-shell { display: flex; min-height: 100vh; padding-top: 64px; }

/* Left navigation (wiki.js-like blue) */
.left-nav { width: 240px; background: #1976d2; color: #fff; padding: 0px; box-sizing: border-box }
.nav-top-buttons { display:flex; gap:10px; margin-bottom:12px; padding:10px 10px; background-color: #14599f; }
.big-btn { display:inline-flex; align-items:center; gap:8px; background: #1976d2; border-radius:8px; padding:10px 12px; color: #fff; text-decoration:none; box-shadow: 0 2px 0 rgba(0,0,0,0.06); }
.big-btn:hover { background: #13f0ae; }
.big-btn svg { opacity:0.95; }
.big-btn.home { width:44px; height:22px; justify-content:center; padding:8px; }
.big-btn.browse { padding:10px 14px; }
.big-btn.browse span { font-size:0.95rem; font-weight:600; }
.left-nav .menu { list-style:none; padding:0; margin:8px 0; }
.left-nav .menu li { margin:10px 10px; color:#eaf2ff; }
.left-nav a { color:#eaf2ff; text-decoration:none; display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:6px; }
.left-nav a:hover { background: #ba711efa; }
.left-nav a.router-link-active { background: #2c9de8e7; }
.group-title { display:flex; align-items:center; justify-content:space-between; width:100%; padding:10px 12px; font-size:0.95rem; color: rgba(255,255,255,0.95); margin-top:10px; font-weight:600; background: transparent; border: none; cursor: pointer; }
.group-title .chev { opacity:0.9; font-size:0.85rem; }
.group-items { list-style:none; padding-left:10px; margin:6px 0 12px; }
.group-items li { margin:6px 0; }

/* Main area */
.main-area { flex:1; display:flex; flex-direction:column; }
.topbar { height:64px; background:#0a0a0a; color:#fff; display:flex; align-items:center; justify-content:space-between; padding:0 20px; position:fixed; top:0; left:0; right:0; z-index:1000 }
.left-spacer { height: 30px }
.topbar .search input { background: #111; border: 1px solid #222; color:#fff; padding:8px 10px; border-radius:20px; width:420px }
.topbar-left { display:flex; align-items:center; gap:12px }
.topbar-logo { width:34px; height:34px; object-fit:cover; border-radius:6px; box-shadow: 0 1px 0 rgba(255,255,255,0.03) }
.topbar-title { font-weight:700; color:#fff; font-size:1.05rem }

.page-body { display:flex; gap:18px; padding:20px }
.content { flex:1; background:#fff; padding:20px; border-radius:6px; box-shadow: 0 1px 0 rgba(0,0,0,0.04) }
.right-aside { width:260px; }
.right-aside .toc { background:#fff; padding:12px; border-radius:6px; border:1px solid #eee }

.site-footer { text-align:center; padding:18px 8px; color:#777; border-top:1px solid #f0f0f0; margin-top:20px }

/* responsive */
@media (max-width: 900px) {
  .left-nav { display:none }
  .page-body { padding:12px }
  .right-aside { display:none }
}
</style>
