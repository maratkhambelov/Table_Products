<template>
      <div class="navigation">
          <div class="navigation_block">
              <div
                      class="navigation_arrow"
                      :class="isFirst"
                      @click="toBack">
              </div>
          </div>
           <span
           class="navigation_numbers">
               {{minCurrent + 1}}
               -
               {{maxCurrent }}
                   <span
                   class="_normal">
                   of
                   </span>
               {{products.length}}
           </span>
          <div class="navigation_block">
              <div
                      class="navigation_arrow"
                      :class="isLast"
                      @click="toNext">
              </div>
          </div>

       </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Navigation",
        computed: {
            ...mapGetters([
                'products',
                'minCurrent',
                'maxCurrent',
                'prodsPerPage'
            ]),
            activeItemProdsPerPage(){
                return this.prodsPerPage.find(item=>item.active === true)
            },
            isFirst(){
                if(this.minCurrent === 0 ){
                    return '_left _disabled'
                }
                return '_left'
            },
            isLast(){
                if(this.maxCurrent === this.products.length){
                    return '_right _disabled'
                }
                return '_right'
            }
        },
        methods:{
            toBack(){
                this.$store.dispatch('backPage');
            },
            toNext(){
                this.$store.dispatch('nextPage');
            },
        }
    }
</script>

<style scoped  lang="scss">

    .navigation{
        display: inline-block;
        &_block{
            padding: 4px;
            display: inline-block;
        }
        &_arrow{
            width: 24px;
            height: 24px;
            /*background-position: center;*/
            /*display: inline-block;*/
            /*background-repeat: no-repeat;*/
            &._left{
                background-image: url("../../assets/Left.svg");

            }
            &._right{
                background-image: url("../../assets/Right.svg");

            }
            &._disabled{
            }
         }
        &_numbers{
            font-style: normal;
            font-size: 14px;
            line-height: 24px;
            color: #3D374A;
            font-weight: 600;
        }

    }
</style>