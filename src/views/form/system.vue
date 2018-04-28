<template>
  <div class="setting app__content--inner">
    <div class="system-setting">
      <div class="page__header">
        <div class="page__header--title">系统设置</div>
        <div class="page__header--content">
          <div class="el-tabs">

            <div class="el-tabs__header">
              <div class="el-tabs__nav-wrap">
                <div class="el-tabs__nav-scroll">
                  <div class="el-tabs__nav">
                    <div class="el-tabs__active-bar" style="width: 150px; transform: translateX(0px);">
                    </div>
                    <div class="el-tabs__item is-active">自动续费</div>
                  </div>
                </div>
                <!-- <div class="resize-triggers">
                  <div class="expand-trigger">
                    <div style="width: 151px; height: 51px;">
                    </div>
                  </div>
                  <div class="contract-trigger"></div>
                </div> -->
              </div>
            </div>

            <div class="el-tabs__content">
              <div class="el-tab-pane"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="page__content">
        <div class="page__content--box">
          <div class="setting-box automatic-renewal width-100">
            <div class="automatic-renewal__rules">
              <p class="margin-bottom20">自动续费规则</p>
              <div class="rules__details">
                <p>1、平台将在<span class="f-bold f-size-l6">每月15-22日</span>（下午15点）执行自动续费操作；</p>
                <p>2、自动续费卡范围<span class="block margin-left20">1）开启自动续费的按月套餐的物联网卡；</span><span
                  class="block margin-left20">2）物联网卡的对应过期时间：<span class="f-bold f-size-l6">本月15日 - 本月末</span>；</span>
                </p>
                <p>3、执行自动续费操作默认续当前套餐档位，套餐周期增加一个月；</p>
                <p>4、开启自动续费功能后，请保持账户余额充足；</p>
                <p>5、余额不足时不执行自动续费；平台会进行短信通知，请在收到短信后及时充值</p>
                <p>6、如因账户余额不足未执行自动续费，用户可在<span class="f-bold f-size-l6">每月23日零点前</span>前进行账户余额充值；（操作步骤：卡片列表导出自动续费卡清单、手动续费）
                </p></div>
            </div>
            <div class="automatic-renewal__operation">
              <div class="operation__export">您有9张物联网卡已经开启自动续费！</div>
              <div class="operation__tips">本月将自动续费0张卡，预计扣除0元</div>
            </div>
            <div class="operation__btn">
              <button type="button" class="el-button el-button--primary"><!----><!----><span>开启自动续费</span></button>
              <button type="button" class="el-button el-button--default"><!----><!----><span>关闭自动续费</span></button>
            </div>
            <div class="el-dialog__wrapper" style="display: none;">
              <div class="el-dialog el-dialog--small" style="top: 15%;">
                <div class="el-dialog__header"><span class="el-dialog__title">批量开启自动续费</span>
                  <button type="button" aria-label="Close" class="el-dialog__headerbtn"><i
                    class="el-dialog__close el-icon el-icon-close"></i></button>
                </div><!----><!----></div>
            </div>
            <div class="el-dialog__wrapper" style="display: none;">
              <div class="el-dialog el-dialog--small" style="top: 15%;">
                <div class="el-dialog__header"><span class="el-dialog__title">开启自动续费</span>
                  <button type="button" aria-label="Close" class="el-dialog__headerbtn"><i
                    class="el-dialog__close el-icon el-icon-close"></i></button>
                </div><!----><!----></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'system-setting',
    components: {}
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import 'setsystem.scss';
  .system-setting {
    background-color: #f4f4f4;
  }
  .app-main {
    background: none;
  }
</style>


