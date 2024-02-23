<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/stores/index'
import { RotateLeftOutlined } from '@ant-design/icons-vue'
import routesAll from '@/router/routes'
import { formatRoutes } from '@/utils/permission'
const route = useRoute()
const { permissions } = useStore()

const isCollapse = ref(false)
const navRoutes = ref(formatRoutes(routesAll, permissions))
const activeIndex = ref(route.name)
</script>
<template>
  <div class="sider-section" :style="[{ width: isCollapse ? '80px' : '243px' }]">
    <div class="logo-section">
      <div class="header-logo-container">
        <img
          v-show="!isCollapse"
          class="header-logo-element"
          alt="斗西家计划"
          src="@/assets/images/header-logo.svg"
        />
        <div class="header-logo-collapse-btn" @click="isCollapse = !isCollapse">
          <RotateLeftOutlined />
        </div>
      </div>
    </div>
    <div class="menu-section">
      <el-scrollbar>
        <el-menu :collapse="isCollapse" :router="true" :default-active="activeIndex">
          <template v-for="route in navRoutes">
            <el-sub-menu v-if="route.children.length" :index="route.name" :key="route.path">
              <template #title>
                <svg-icon v-if="route.meta.nav?.icon" :name="route.meta.nav.icon" width="24px" height="18px" style="margin-right: 5px;"></svg-icon>
                <span>{{ route.meta.nav.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="data in route.children"
                  :key="data.name"
                  :index="data.name"
                  :route="{ name: data.name }"
                >
                  <span>{{ data.meta.nav.title }}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item
              v-else
              :key="route.name"
              :index="route.name"
              :route="{ name: route.name }"
            >
              <span>{{ route.meta.nav.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<style type="text/css" lang="less" scoped>
.sider-section {
  position: relative;
  width: 243px;
  background-color: #fff;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;

  .menu-section {
    max-height: calc(100vh - 56px);
  }

  :deep(.el-menu) {
    border-right: none;
  }
}

.header-logo-container {
  display: flex;
  height: 54px;
  justify-content: center;
  align-items: center;

  .header-logo-element {
    margin: 0 20px;
    width: 138px;
  }
  .header-logo-collapse-btn {
    cursor: pointer;
    font-size: 20px;
    line-height: 54px;
    position: relative;
    text-align: center;
    top: 4px;
    transition: all 0.2s ease;
    width: 80px;
  }
}
</style>
