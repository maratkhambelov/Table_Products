<template>
      <div class="navigation">
          <div class="navigation_block"
               :class="isFirst"
               @click="toBack">
              <div class="navigation_arrow">
              </div>
          </div>
          <div class="navigation_numbers">
              <span>
               {{minCurrent + 1}}
               -
               {{maxCurrent }}
              </span>
                   <span class="_normal">
                   of
                   </span>
              <span>
               {{products.length}}
              </span>
           </div>
          <div class="navigation_block"
               :class="isLast"
               @click="toNext">
              <div class="navigation_arrow">
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
            padding: 11px;
            margin: 11px 0px -11px 0;
            display: inline-block;
            border-radius: 2px;
            border: 1px solid #D5DAE0;
            &:hover{
                cursor: pointer;
            }
            &._disabled{
                border: 1px solid #C6CBD4;
                opacity: 0.25;
            }
            .navigation_arrow{
                width: 8px;
                height: 8px;

                background-repeat: no-repeat;
                background-position: center;

            }
            &._left{
                .navigation_arrow{
                    background-image: url("../../assets/navigation-arrow.svg");
                }

            }
            &._right{
                .navigation_arrow{
                    background-image: url("../../assets/navigation-arrow.svg");
                    transform: rotateY(180deg);
                }
            }
        }

        &_numbers{
            font-style: normal;
            display: inline;
            font-size: 14px;
            line-height: 24px;
            color: #3D374A;
            font-weight: 600;
        }

    }
</style>