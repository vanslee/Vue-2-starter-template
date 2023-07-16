<script>
export default {
  emits: ['as'],
  data() {
    return {
      visible: false,
      note: '',
      public: false,
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    showDlg() {
      this.visible = true
    },
    publishNote() {
      this.visible = false
      this.$emit('publishNote')
    },
  },
}
</script>

<template>
  <div v-show="visible" style="display: flex; justify-content: center;">
    <el-card
      class="note-dlg"
    >
      <template #header>
        <i class="el-icon-circle-close close-icon" @click="visible = false" />
      </template>
      <el-input
        v-model="note"
        style="background-color: #303332;"
        type="textarea"
        :autosize="{ minRows: 7, maxRows: 10 }"
        placeholder="写下这一刻的想法"
      />
      <!-- <template #footer> -->
      <div style="margin-top: 10px;align-items: center;display: flex;justify-content: space-between;">
        <!-- <el-select>公开</el-select> -->
        <el-switch
          v-model="public"
          style="display: block"
          active-color="#ff4949"
          inactive-color="#13ce66"
          active-text="私密"
          inactive-text="公开"
        />
        <el-button type="primary" round @click="publishNote">
          发布
        </el-button>
      </div>
      <!-- </template> -->
    </el-card>
  </div>
</template>

<style scoped>
 ::v-deep .el-textarea__inner{
  background-color: #303332;
  color: white;
}
::v-deep .el-card__header{
  padding: 0;
}
.note-dlg {
  height: 22vh;
  width: 800px;
  bottom: 10vh;
  margin-top: 0;
  position: absolute;
  border-radius:  20px;
  background-color: #303332;
}
.close-icon {
  float: right;
  color:white;
  font-size: 20px;
  cursor: pointer;
  padding: 5px 10px 5px 0;
}
</style>
