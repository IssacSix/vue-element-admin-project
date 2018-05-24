<template>
  <div class="img-preview">
    <div class="img-inputer img-inputer--light img-inputer--full">
      <i class="iconfont img-inputer__icon"></i>
      <p class="img-inputer__placeholder">点击或拖拽选择图片</p>
      <div class="img-inputer__preview-box" v-show="image.result!==''">
        <img :src="image.result" class="img-inputer__preview-img">
      </div>
      <label ref="label" title="双击可预览" class="img-inputer__label"></label> 
      <div class="img-inputer__mask">
        <p class="img-inputer__file-name">{{image.name}}</p> 
        <p class="img-inputer__change">{{canEdit ? '点击上传' : '编辑后可修改'}}</p>
      </div> 
      <input type="file" :id="tid" @change="addImg" accept="image/jpg,image/gif,image/png,image/jpeg,image/bmp;" capture="video" class="img-inputer__inputer"> 
      <div class="img-inputer__err">{{errorTextOrigin!=='' ? errorTextOrigin : errorText}}</div>
    </div> 
    <p>
      <span>{{title}}</span>
      <slot name="tip"></slot>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: {
        result: '',
        name: ''
      },
      errorTextOrigin: ''
    }
  },
  props: {
    title: {
      type: String
    },
    tid: {
      type: String
    },
    canEdit: {
      type: Boolean,
      default: true
    },
    errorText: {
      type: String,
      default: ''
    }
  },
  mounted() {
    var obj = this.$refs.label
    obj.setAttribute('for', this.tid)
  },
  methods: {
    addImg(e) {
      console.log(e.target.files)
      const imgFile = e.target.files[0]
      if (!/image\/\w+/.test(imgFile.type)) {
        this.errorTextOrigin = '请选择正确类型文件'
        setTimeout(() => {
          this.errorTextOrigin = ''
        })
        return
      }
      if (imgFile.size >= 5 * 1024 * 1024) {
        this.errorTextOrigin = '文件大小不能超过5M'
        setTimeout(() => {
          this.errorTextOrigin = ''
        }, 2000)
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(imgFile)
      const that = this
      console.log(reader.result)
      reader.onloadend = function() {
        that.image.result = reader.result
        that.image.name = imgFile.name
        that.$emit('get-img', { tid: that.tid, result: that.image.result, title: that.title })
      }
    }
  }
}
</script>

<style>
</style>
