BX.Vue.mutateComponent('BXmakerAuthuserphoneLink', {
    props: {
        classes: {
            type: String,
            default: '',
        },
    },
    methods:{
        onClick(){
            this.$emit('onClick');
        }
    },
    template: `
        <a :class="[classes]" @click.prevent.stop="onClick">
             <slot />
        </a>
    `,
});