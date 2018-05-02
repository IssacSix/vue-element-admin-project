<template>
  <div class="dataZone">
    <div class="page__header"><div class="page__header--title">流量池</div></div>
    <div class="page__content">
      <div class="page__content--box">
        <div class="pal-empty-hint pool-empty-tip">
          <div class="margin-top20">您还没有流量池卡！</div> 
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  created: {
  }
}
</script>

<style>
@import url('../dashboard/home.scss');
.dataZone .page__header {
    padding: 0 10px;
    background-color: #fff;
}
.dataZone .page__header--title {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    height: 50px;
    font-size: 16px;
}
.dataZone .page__header--title:after {
    content: " ";
    width: 100%;
    display: inline-block;
    position: absolute;
    bottom: 5px;
    left: 0;
    border-bottom: 1px solid #ebebeb;
}
.dataZone .pal-empty-hint {
    margin: 100px auto;
    text-align: center;
    color: #999;
}
.dataZone .page__content {
    padding: 10px;
}
.dataZone .page__content--box {
    padding: 20px;
    background-color: #fff;
    min-height: calc(100vh - 212px);
}
.margin-top20 {
    margin-top: 20px!important;
}
</style>



