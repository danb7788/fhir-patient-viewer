<script>
import NodeTree from "./NodeTree";

export default {
    components: {
        NodeTree
    },

    data() {
        return {
            entry: [],
            timezone: '',
            resourceTypes: [],
            selectedResourceType: null,
            selectedResourceTypeData: [],
            selectedResource: null,
            selectedResourceData: null
        }
    },

    mounted() {
        this.axios.get(window.intersystemsUrl + 'Patient/'+window.intersystemsPatientId+'/$everything')
            .then(response => {
                this.entry = response.data.entry;

                this.entry.forEach(item => {
                    if (! this.resourceTypes.includes(item.resource.resourceType)) this.resourceTypes.push(item.resource.resourceType);
                });
            });

        this.timezone = window.moment.tz.guess();

        this.$root.$on('changeTo', (ref) => {
            this.changeResource(ref);
        });
    },

    methods: {
        getResourceData(resourceType) {
            return this.entry.filter(item => item.resource.resourceType === resourceType);
        },

        expandResourceType(resourceType) {
            this.$refs.main.scrollIntoView();

            this.closeResourceType();

            this.selectedResourceType = resourceType;

            this.selectedResourceTypeData = this._.orderBy(this.entry
                .filter(item => item.resource.resourceType === resourceType), item => item.resource.meta.lastUpdated, ['desc']);
        },

        closeResourceType() {
            this.$refs.main.scrollIntoView();

            this.selectedResource = null;
            this.selectedResourceType = null;
            this.selectedResourceTypeData = [];
        },

        expandResource(resource) {
            this.$refs.main.scrollIntoView();

            this.closeResourceType();

            this.selectedResource = resource;
        },

        closeResource() {
            this.$refs.main.scrollIntoView();

            this.selectedResource = null;
        },

        changeResource(ref) {
            this.$refs.main.scrollIntoView();

            let id = ref.substring(ref.lastIndexOf("/") + 1, ref.length);
            let resourceType = ref.substring(ref.lastIndexOf("/"), 0);

            this.selectedResourceType = resourceType;

            this.selectedResourceTypeData = this._.orderBy(this.entry
                .filter(item => item.resource.resourceType === resourceType), item => item.resource.meta.lastUpdated, ['desc']);

            this.selectedResource = this.selectedResourceTypeData.filter(item => item.resource.id === id)[0];
        }
    },

    computed: {
        patient() {
            let records = this.entry.filter(item => item.resource.resourceType === 'Patient');
            return records.length > 0 ? records[0].resource : null;
        }
    }
}
</script>

<template>
    <div ref="main">
        <div v-if="selectedResourceType && ! selectedResource" class="bg-white w-100 min-vh-100" style="z-index: 100">
            <div class="container text-center">
                <div class="row">
                    <div class="pb-3 col-xl-6 m-auto">
                        <div class="p-3 border rounded-3 bg-light">
                            <h3><a href="" @click.prevent="closeResourceType" class="text-decoration-none text-success">
                                Patient/{{ patient.id }}</a>
                                &#8594; {{ selectedResourceType }}
                            </h3>
                        </div>
                        <div v-for="(item, index) in selectedResourceTypeData" :key="index">
                            <a href="" class="text-decoration-none text-black" @click.prevent="expandResource(item)">
                                <div class="mt-2 p-3 border rounded-3 bg-light small">
                                    <div><b>{{ item.resource.resourceType }}/{{ item.resource.id }}</b></div>
                                    <div>Updated on: {{ item.resource.meta.lastUpdated }}</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="selectedResource" class="bg-white w-100 min-vh-100" style="z-index: 200">
            <div class="container text-center">
                <div class="row">
                    <div class="pb-3 col-xl-6 m-auto small">
                        <div class="p-3 border rounded-3 bg-light">
                            <h3><a href="" @click.prevent="closeResourceType" class="text-decoration-none text-success">
                                Patient/{{ patient.id }}</a>
                                &#8594;
                                <a href="" @click.prevent="expandResourceType(selectedResource.resource.resourceType)"
                                   class="text-decoration-none text-success">
                                    {{ selectedResource.resource.resourceType }}
                                </a> &#8594; {{ selectedResource.resource.resourceType }}/{{ selectedResource.resource.id }}
                            </h3>
                        </div>
                        <div class="mt-2 p-3 border bg-light">
                            <div v-for="(line, key) in selectedResource.resource" :key="key" class="text-start">
                                <node-tree :name="key" :node="line"></node-tree>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="! selectedResourceType && ! selectedResource" class="container text-center">
            <div class="row">
                <div class="pb-3 col-xl-6 m-auto">
                    <div v-if="! this.patient" class="p-3">Loading...</div>
                    <div v-else class="p-3 border rounded-3 bg-light">
                        <h3>Patient/{{ patient.id }}</h3>
                    </div>
                    <div v-for="(resourceType, index) in resourceTypes" :key="index">
                        <a href="" class="text-black" @click.prevent="expandResourceType(resourceType)">
                            <div class="mt-2 p-3 border rounded-3 bg-light"><b>{{ resourceType }}</b></div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    a {
        text-decoration: none !important;
    }

    a:hover {
        text-decoration: underline !important;
    }

    a:hover > div {
        background: #e0f3e0 !important;
    }
</style>