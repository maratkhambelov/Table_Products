<template>
      <div class="navigation">
          <div class="navigation_block"
               :class="isFirst">
              <div
                      class="navigation_arrow"

                      @click="toBack">
              </div>
          </div>
           <span class="navigation_numbers">
               {{minCurrent + 1}}
               -
               {{maxCurrent }}
                   <span class="_normal">
                   of
                   </span>
               {{products.length}}
           </span>
          <div class="navigation_block"
               :class="isLast"
          >
              <div
                      class="navigation_arrow"
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
        /*display: inline-block;*/
        &_block{
            padding: 3px;
            display: inline-block;
            box-sizing: border-box;
            border-radius: 2px;
            border: 1px solid #D5DAE0;
            &._disabled{
                border: 1px solid #C6CBD4;
                opacity: 0.25;
            }
            .navigation_arrow{
                width: 24px;
                height: 24px;
                &:hover{
                    cursor: pointer;
                }
            }
            &._left{
                .navigation_arrow{
                    background-image: url("../../assets/Left.svg");

                }

            }
            &._right{
                .navigation_arrow{
                    background-image: url("../../assets/Right.svg");

                }
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