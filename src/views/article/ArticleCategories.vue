<script>
import { mapActions, mapState } from 'pinia'
import { useArticleStore } from '@/stores/article'
import { formatTimeStamp } from '@/utils/time'
export default {
  data() {
    const params = {
      size: 5,
      current: 0,
    }
    return {
      params,

    }
  },
  computed: {
    ...mapState(useArticleStore, ['categories', 'totalCategories']),

  },
  created() {
    this.fetchData()
  },
  methods: {
    toArticelsByCid(cid) {
      this.$router.push({
        name: 'CArticle',
        params: { cid },
      })
    },
    ...mapActions(useArticleStore, ['getArticleCategoires']),
    async fetchData() {
      this.getArticleCategoires(this.params)
    },
    changePage(current) {
      this.params.current = current
      this.fetchData()
    },
    formatTimeStamp,
  },
}
</script>

<template>
  <div style="width: 100%;height: 100%;overflow-y: scroll;">
    <el-skeleton v-if="!categories" :rows="6" animated />
    <el-timeline v-else>
      <div v-for="category in categories" :key="category.id">
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <div :key="category.id" style="cursor: pointer;" @click="toArticelsByCid(category.id)">
              <h4>{{ category.categoryName }}</h4>
              <p style="margin-top: 1vh;">
                标签创建于 {{ formatTimeStamp(category.createTime) }}
              </p>
            </div>
          </el-card>
        </el-timeline-item>
      </div>
    </el-timeline>
    <el-pagination
      style="text-align: center;" background layout="prev, pager, next" :total="totalCategories"
      :page-size="params.size" @current-change="changePage"
    />
  </div>
</template>

<style  scoped></style>
