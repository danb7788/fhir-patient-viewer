<script>
export default {
    name: 'NodeTree',
    props: ['name', 'node'],

    data() {
        return {
            isOpen: false
        }
    },

    computed: {
        isFolder: function() {
            return Array.isArray(this.node) && this.node.length > 0;
        }
    },

    methods: {
        toggle: function () {
            if (this.isFolder) {
                this.isOpen = ! this.isOpen;
            }
        },

        loadRef: function(ref) {
            this.$root.$emit('changeTo', ref);
        }
    }
};
</script>

<template>
    <div class="mb-2">
        <div v-if="isFolder">
            <a href class="fw-bold text-decoration-none text-black" @click.prevent="toggle">
                {{ name }} <span>[{{ isOpen ? '-' : '+' }}]</span>
            </a>
            <div v-if="isOpen" class="ms-3 mt-2">
                <div v-for="(child, index) in node" :key="index">
                    <node-tree :name="'Item #' + (index + 1)" :node="child"></node-tree>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-if="typeof node === 'object'">
                <div>
                    <div class="mb-2"><b>{{ name }}</b></div>
                    <node-tree class="ms-3" v-for="(child, key) in node" :key="key" :name="key" :node="child"></node-tree>
                </div>
            </div>
            <div v-else class="mb-2">
                <span v-if="name === 'reference'">
                    <a href="" class="text-success" @click.prevent="loadRef(node)">{{ node }}</a>
                </span>
                <span v-else><b>{{ name }}:</b> {{ node }}</span>
            </div>
        </div>
    </div>
</template>
