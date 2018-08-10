<template>
    <div class="chekout">
        <div class="app">
            <div class="container">
                <div class="cart">
                    <div class="checkout-title">
                        <span>{{message}}</span>
                    </div>
                     <!-- table -->
                    <div class="item-list-wrap">
                        <div class="cart-item">
                            <div class="cart-item-head">
                                <ul>
                                    <li>商品信息</li>
                                    <li>商品金额</li>
                                    <li>商品数量</li>
                                    <li>总金额</li>
                                    <li>编辑</li>
                                </ul>
                            </div>
                            <ul class="cart-item-list">
                                <li v-for="(item,index) in  productList"
                                 v-bind:key="index"
                                >
                                    <div class="cart-tab-1">
                                        <div class="cart-item-check">
                                            <a href="javascript:;" class="item-check-btn"
                                                v-bind:class="{'check':item.checked}"
                                                @click="selectedProduct(item)"
                                            >
                                            <svg class="icon icon-ok"><use xlink:href="#icon-ok"></use></svg>
                                            </a>
                                        </div>
                                        <div class="cart-item-pic">
                                            <img  v-bind:src="item.imgPic" alt="烟">
                                        </div>
                                        <div class="cart-item-title">
                                            <div class="item-name">{{item.name}}</div>
                                        </div>
                                        <div class="item-include">
                                            <dl>
                                            <dt>赠送:</dt>
                                            <dd v-for="(gift,index) in item.gifts"
                                             v-bind:key="index"
                                            >
                                                {{gift.partName}}
                                            </dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <div class="cart-tab-2">
                                        <div class="item-price">{{item.price | formatMoney('元')}}</div>
                                    </div>
                                    <div class="cart-tab-3">
                                        <div class="item-quantity">
                                            <div class="select-self select-self-open">
                                            <div class="quantity">
                                                <a href="javascript:;" @click="changeQuality(item,-1)">-</a>
                                                <input type="text"  v-model="item.amount">
                                                <a href="javascript:;" @click="changeQuality(item,1)">+</a>
                                            </div>
                                            </div>
                                            <div class="item-stock">有货</div>
                                        </div>
                                    </div>
                                    <div class="cart-tab-4">
                                        <div class="item-price-total">{{item.price * item.amount | formatMoney('元')}}</div>
                                    </div>
                                    <div class="cart-tab-5">
                                        <div class="cart-item-operation">
                                            <a href="javascript:void 0" class="item-edit-btn"
                                                @click="confirmProduct(item)"
                                            >
                                                删除
                                            <svg class="icon icon-del"><use xlink:href="#icon-del" ></use></svg>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- footer -->
                    <div class="cart-foot-wrap">
                        <div class="cart-foot-l">
                            <div class="item-all-check">
                            <a href="javascript:void 0">
                                <span class="item-check-btn" 
                                :class="{'check': checkFlag}"
                                @click="checkAll(true)"
                                >
                                <svg class="icon icon-ok"><use xlink:href="#icon-ok"></use></svg>
                                </span>
                                <span @click="checkAll(true)">全选</span>
                            </a>
                            </div>
                            <div class="item-all-del">
                            <a href="javascript:void 0" class="item-del-btn" @click="checkAll(false)">
                                <span>取消全选</span>
                            </a>
                            </div>
                        </div>
                        <div class="cart-foot-r">
                            <div class="item-total">
                            Item total: <span class="total-price">{{ totalMoney | formatMoney('元') }}</span>
                            </div>
                            <div class="next-btn-wrap">
                            <a href="./address.vue" class="btn btn--red" style="width: 200px">结账</a>
                            </div>
                        </div>
                    </div>

                    <!-- 删除商品弹框 -->
                    <div class="md-modal modal-msg md-modal-transition" id="showModal" v-bind:class="{'md-show':delFlag}">
                        <div class="md-modal-inner">
                            <div class="md-top">
                            <button class="md-close" @click="delFlag = false">关闭</button>
                            </div>
                            <div class="md-content">
                            <div class="confirm-tips">
                                <p id="cusLanInfo">你确认删除此订单信息吗?</p>
                            </div>
                            <div class="btn-wrap col-2">
                                <button class="btn btn--m" id="btnModalConfirm" @click="delProduct">Yes</button>
                                <button class="btn btn--m btn--red" id="btnModalCancel" @click="delFlag=false">No</button>
                            </div>
                            </div>
                        </div>
                    </div>

                     <div class="md-overlay" v-if="delFlag"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {

    data () {
        return {
            message:"购物车",
            productList: [],
            totalMoney:0,
            checkFlag:false,
            i:0,
            delFlag:false,
            currentProduct:''
        }
    },

    filters: {
        formatMoney (value,type) {
            return "￥"+value.toFixed(2)+type
        }
    },

    mounted () {
        this.cartView();
    },

    methods: {
        cartView () {
            this.$http.get("/src/data/cart.json").then(res=>{
                this.productList = res.body.result.list;
            })
        },

        changeQuality (product,type) {
            if (type>0) {
                product.amount++
            }else{
                product.amount--
                if(product.amount<1){
                    product.amount = 1
                }
            }
            this.CalTotalMoney();
        },

        selectedProduct (item) {
            this.i = 0;
            let len = this.productList.length;
            if (typeof item.checked === 'underfined') {
                this.$set(item,"checked",true)
            } else {
                item.checked = !item.checked;
                this.productList.map((item,index)=>{
                    if (!item.checked) {
                        this.checkFlag = false
                    }else{
                        this.i++;
                        if(this.i==len){
                            this.checkFlag = true
                        }
                    }
                })
            }
            this.CalTotalMoney();
        },

        CalTotalMoney () {
            this.totalMoney = 0;
            this.productList.map((item,index)=>{
                if (item.checked) {
                    this.totalMoney += item.price * item.amount
                }
            })
        },

        checkAll (flag) {
            if (flag) {
                this.checkFlag = flag;
                this.productList.map((item,index)=>{
                    if (typeof item.checked === 'underfined') {
                        this.$set(item,"checked",true)
                    }else{
                        item.checked = flag
                    }
                })
            }else {
                this.checkFlag = flag;
                this.productList.map((item,index)=>{
                    if (typeof item.checked === 'underfined') {
                        this.$set(item,"checked",true)
                    }else{
                        item.checked = flag
                    }
                }) 
            }
            this.CalTotalMoney();
        },

        confirmProduct (item) {
            this.currentProduct = item;
            this.delFlag = true
        },
        
        delProduct () {
            let index = this.productList.indexOf( this.currentProduct);
            this.productList.splice(index,1);
            this.delFlag = false;
            this.CalTotalMoney();
        }
    }
}
</script>
<style scoped>
    @import  './assets/style/app.css';
    @import  './assets/style/base.css';
    @import  './assets/style/reset.css';
    @import './assets/style/modal.css';
    .quantity input {
        width: 40px;
        padding: 5px 10px;
        text-align: center;
    }
</style>
 



