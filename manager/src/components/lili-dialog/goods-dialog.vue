<template>
  <div class="wrapper">
    <div class="wap-content">
      <div class="query-wrapper">
        <div class="query-item">
          <div>搜索范围</div>
          <Input
            placeholder="商品名称"
            @on-clear="
              goodsData = [];
              goodsParams.goodsName = '';
              goodsParams.pageNumber = 1;
              getQueryGoodsList();
            "
            @on-enter="
              () => {
                goodsData = [];
                goodsParams.pageNumber = 1;
                getQueryGoodsList();
              }
            "
            icon="ios-search"
            clearable
            style="width: 150px"
            v-model="goodsParams.goodsName"
          />
        </div>
        <div class="query-item">
          <Cascader
            v-model="category"
            placeholder="请选择商品分类"
            style="width: 250px"
            :data="skuList"
          ></Cascader>
        </div>
        <div class="query-item">
          <Button
            type="primary"
            @click="
              goodsData = [];
              getQueryGoodsList();
            "
            icon="ios-search"
            >搜索</Button
          >
        </div>
      </div>
      <div>
        <div
          class="wap-content-list"
        >
          <div
            class="wap-content-item"
            :class="{ active: item.selected }"
            @click="checkedGoods(item, index)"
            v-for="(item, index) in goodsData"
            :key="index"
          >
            <div>
              <img :src="item.thumbnail" alt="" />
            </div>
            <div class="wap-content-desc">
              <div class="wap-content-desc-title">{{ item.goodsName }}</div>

              <div class="wap-sku">{{ item.goodsUnit }}<Tag style="margin-left: 10px;" :color="item.salesModel === 'RETAIL' ? 'default' : 'geekblue'">{{item.salesModel === "RETAIL" ? "零售型" : "批发型"}}</Tag></div>
              <div class="wap-content-desc-bottom">
                <div>￥{{ item.price | unitPrice }}</div>
              </div>
            </div>
          </div>
          <Spin size="large" fix v-if="loading"></Spin>

          <div v-if="empty" class="empty">暂无商品信息</div>
        </div>
        <Page
          :total="total"
          class="pageration"
          @on-change="changePageSize"
          :page-size="goodsParams.pageSize"
          size="small"
          show-total
          show-elevator

        >
        </Page>
      </div>
    </div>
  </div>
</template>
<script>
import * as API_Goods from "@/api/goods";
export default {
  data() {
    return {
      type: "multiple", //单选或者多选 single  multiple
      skuList: [], // 商品sku列表
      total: 0, // 商品总数
      goodsParams: {
        // 商品请求参数
        pageNumber: 1,
        pageSize: 15,
        order: "desc",
        goodsName: "",
        sn: "",
        categoryPath: "",
        marketEnable: "UPPER",
        authFlag: "PASS",
        sort:"createTime"
      },
      category: [], // 分类
      goodsData: [], // 商品数据
      empty: false, // 空数据
      loading: false, // 加载状态
    };
  },
  props: {
    selectedWay: {
      type: Array,
      default: function () {
        return new Array();
      },
    },
  },
  watch: {
    category(val) {
      this.goodsParams.categoryPath = val[2];
    },
    selectedWay: {
      handler() {
        this.$emit("selected", this.selectedWay);
      },
      deep: true,
      immediate: true,
    },
    "goodsParams.categoryPath": {
      handler: function () {
        this.goodsData = [];
        (this.goodsParams.pageNumber = 0), this.getQueryGoodsList();
      },
      deep: true,
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    changePageSize(v){
      this.goodsParams.pageNumber = v;
      this.getQueryGoodsList();
    },
    // 获取商品列表
    getQueryGoodsList() {
      API_Goods.getGoodsSkuData(this.goodsParams).then((res) => {
        this.initGoods(res);
      });
    },
    // 获取列表方法
    initGoods(res) {
      if (res.result.records.length != 0) {
        res.result.records.forEach((item) => {
          item.selected = false;
          item.___type = "goods"; //设置为goods让pc wap知道标识
          this.selectedWay.forEach((e) => {
            if (e.id && e.id === item.id) {
              item.selected = true;
            }
          });
        });
        /**
         * 解决数据请求中，滚动栏会一直上下跳动
         */
        this.total = res.result.total;
        this.goodsData = res.result.records;
      } else {
        this.empty = true;
      }
    },
    // 查询商品
    init() {
      API_Goods.getGoodsSkuData(this.goodsParams).then((res) => {
        // 商品
        this.initGoods(res);
      });
      API_Goods.getCategoryTree({deleteFlag: false}).then((res) => {
        if (res.success) {
          this.deepGroup(res.result);
        }
      });
    },

    deepGroup(val) {
      val.forEach((item) => {
        let childWay = []; //第二级
        // 第二层
        if (item.children) {
          item.children.forEach((child) => {
            // // 第三层
            if (child.children) {
              child.children.forEach((grandson, index, arr) => {
                arr[index] = {
                  value: grandson.id,
                  label: grandson.name,
                  children: "",
                };
              });
            }
            let children = {
              value: child.id,
              label: child.name,
              children: child.children,
            };
            childWay.push(children);
          });
        }
        // 第一层
        let way = {
          value: item.id,
          label: item.name,
          children: childWay,
        };

        this.skuList.push(way);
      });
    },

    /**
     * 点击商品
     */
    checkedGoods(val, index) {
      // 如果单选的话
      if (this.type != "multiple") {
        this.goodsData.forEach((item) => {
          item.selected = false;
        });
        this.selectedWay = [];
        val.selected = true;
        this.selectedWay.push(val);

        return false;
      }

      if (val.selected == false) {
        val.selected = true;
        this.selectedWay.push(val);
      } else {
        val.selected = false;
        for (let i = 0; i < this.selectedWay.length; i++) {
          if (this.selectedWay[i].id === val.id) {
            this.selectedWay.splice(i, 1);
            break;
          }
        }
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import "./style.scss";
.wap-content {
  width: 100%;
}
.empty {
  text-align: center;
  padding: 8px 0;
  width: 100%;
}
.wap-content {
  flex: 1;
  padding: 0;
}
.wap-content-list {
  display: flex;
  position: relative;
  flex-wrap: wrap;
  height: 340px;
}
.wap-content-item {
  width: 210px;
  margin: 10px 7px;
  padding: 6px 0;
}
// .wap-content-item{

// }
.active {
  background: url("../../assets/selected.png") no-repeat;
  background-position: right;
  background-size: 10%;
}
</style>
