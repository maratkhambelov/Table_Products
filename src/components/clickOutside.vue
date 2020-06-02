<!--<script>-->
<!--    export default {-->
<!--        bind(el, binding, vnode) {-->
<!--            var vm = vnode.context;-->
<!--            var callback = binding.value;-->

<!--            el.clickOutsideEvent = function (event) {-->
<!--                if (!(el == event.target || el.contains(event.target))) {-->
<!--                    return callback.call(vm, event);-->
<!--                }-->
<!--            };-->
<!--            document.body.addEventListener('click', el.clickOutsideEvent);-->
<!--        },-->
<!--        unbind(el) {-->
<!--            document.body.removeEventListener('click', el.clickOutsideEvent);-->
<!--        }-->
<!--    }-->


<!--    // bind: function (el, binding, vNode) {-->
<!--    //     el.__vueClickOutside__ = event => {-->
<!--    //         if (!el.contains(event.target)) {-->
<!--    //             // call method provided in v-click-outside value-->
<!--    //             vNode.context[binding.expression](event)-->
<!--    //             event.stopPropagation()-->
<!--    //         }-->
<!--    //     }-->
<!--    //     document.body.addEventListener('click', el.__vueClickOutside__)-->
<!--    // },-->
<!--    // unbind: function (el, binding, vNode) {-->
<!--    //     console.log(binding)-->
<!--    //     console.log(vNode)-->
<!--    //     // Remove Event Listeners-->
<!--    //     document.removeEventListener('click', el.__vueClickOutside__)-->
<!--    //     el.__vueClickOutside__ = null-->
<!--    // }-->
<!--</script>-->
