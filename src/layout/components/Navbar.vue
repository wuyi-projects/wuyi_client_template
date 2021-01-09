<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <search id="header-search" class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>

      <el-dropdown class="right-menu-item hover-effect" trigger="click">
        <div class="el-dropdown-link">
          <span style="font-size:14px;">当前公司：</span>
          <el-tag style="font-size:14px;">{{ currentCompany.name }}</el-tag>
          <i class="el-icon-arrow-right" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <template v-for="(company, index) in companys">
            <el-dropdown-item
              v-if="!company.selected"
              :key="index"
              @click.native="handleSwitchCompany(index)"
            >{{ company.name }}</el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <i class="el-icon-caret-bottom" />
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/profile-index">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import { getCompany } from '@/api/company'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search,
    index
  },
  data() {
    return {
      currentCompany: {
        name: '物一技术',
        companyId: 1,
        selected: true
      },
      companys: [
        {
          name: '物一技术',
          companyId: 1,
          selected: true
        },
        {
          name: '物一技术2',
          companyId: 2,
          selected: false
        },
        {
          name: '物一技术3',
          companyId: 3,
          selected: false
        },
        {
          name: '物一技术4',
          companyId: 4,
          selected: false
        },
        {
          name: '物一技术5',
          companyId: 5,
          selected: false
        },
        {
          name: '物一技术6',
          companyId: 6,
          selected: false
        },
        {
          name: '物一技术7',
          companyId: 7,
          selected: false
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device', 'index'])
  },
  methods: {
    handleSwitchCompany(index) {
      console.log(index)
      const selectCompany = this.companys[index]
      this.currentCompany = selectCompany
      for (let i = 0, len = this.companys.length; i < len; i++) {
        this.companys[i].selected = false
      }
      this.companys[index].selected = true
      // 选中公司全局赋值
      console.log(this.companys[index].companyId)
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
