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
    ...mapState(useArticleStore, ['tags', 'totalTags']),

  },
  created() {
    this.fetchData()
  },
  methods: {
    ...mapActions(useArticleStore, ['getArticleTags']),
    async fetchData() {
      this.getArticleTags(this.params)
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
    <el-skeleton v-if="!tags" :rows="6" animated />
    <el-timeline v-else>
      <div v-for="(tag) in tags" :key="tag.id">
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <h4>{{ tag.tagName }}</h4>
            <p>标签创建于 {{ formatTimeStamp(tag.createTime) }}</p>
          </el-card>
        </el-timeline-item>
      </div>
    </el-timeline>
    <el-pagination
      style="text-align: center;" background layout="prev, pager, next" :total="totalTags"
      :page-size="params.size" @current-change="changePage"
    />
  </div>
</template>

<style  scoped></style>
