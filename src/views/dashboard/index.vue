<template>
  <div class="dashboard-container">
  1111
  </div>
</template>

<script>
import {GetUserinfopage} from '@/api/user'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },created(){
this.GetUserinfopage()

  },methods:{
    GetUserinfopage(){

      GetUserinfopage({uid:892,pageIndex:1,pageSize:10}).then((res) => {
        
        })
        .catch(() => {})
    }}
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
