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
            this.closeResourceType();

            this.selectedResourceType = resourceType;

            this.selectedResourceTypeData = this.entry.filter(item => item.resource.resourceType === resourceType);
        },

        closeResourceType() {
            this.selectedResource = null;
            this.selectedResourceType = null;
            this.selectedResourceTypeData = [];
        },

        expandResource(resource) {
            this.closeResourceType();

            this.selectedResource = resource;
        },

        closeResource() {
            this.selectedResource = null;
        },

        changeResource(ref) {
            let id = ref.substring(ref.lastIndexOf("/") + 1, ref.length);
            let resourceType = ref.substring(ref.lastIndexOf("/"), 0);

            this.selectedResourceType = resourceType;

            this.selectedResourceTypeData = this.entry.filter(item => item.resource.resourceType === resourceType);

            this.selectedResource = this.selectedResourceTypeData.filter(item => item.resource.id === id)[0];
        }
    },

    computed: {
        patient() {
            let records = this.entry.filter(item => item.resource.resourceType === 'Patient');
            return records.length > 0 ? records[0].resource : null;
        },

        patientName() {
            return this.patient ? this.patient.name[0].family + ', ' + this.patient.name[0].given[0] : null;
        },

        patientAge() {
            if (! this.patient) return null;

            let today = new Date();
            let birthDate = new Date(this.patient.birthDate);
            let age = today.getFullYear() - birthDate.getFullYear();
            let m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }
    }
}
</script>

<template>
    <div>
        <div v-if="selectedResourceType" class="position-absolute bg-white w-100 min-vh-100" style="z-index: 100">
            <div class="container text-center">
                <div class="row py-3">
                    <div class="p-3 border shadow-lg">
                        <h3><a href="" @click.prevent="closeResourceType" class="text-decoration-none text-success">
                            {{ patientName }} ({{ patientAge }})</a>
                            / {{ selectedResourceType }}
                        </h3>
                    </div>
                    <div class="p-3 col-xl-8 m-auto small">
                        <div class="d-flex flex-wrap justify-content-center align-items-center">
                            <div v-for="(item, index) in selectedResourceTypeData" :key="index">
                                <a href="" class="text-decoration-none text-black" @click.prevent="expandResource(item)">
                                    <div class="m-2 p-3 border rounded-3 shadow-lg">
                                        <div><b>Record ID: {{ item.resource.id }}</b></div>
                                        <div>Updated on: {{ item.resource.meta.lastUpdated }}</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="selectedResource" class="position-absolute bg-white w-100 min-vh-100" style="z-index: 200">
            <div class="container text-center">
                <div class="row py-3">
                    <div class="p-3 border shadow-lg">
                        <h3><a href="" @click.prevent="closeResourceType" class="text-decoration-none text-success">
                            {{ patientName }} ({{ patientAge }})</a>
                            /
                            <a href="" @click.prevent="expandResourceType(selectedResource.resource.resourceType)"
                               class="text-decoration-none text-success">
                                {{ selectedResource.resource.resourceType }}
                            </a> / {{ selectedResource.resource.resourceType }} with ID {{ selectedResource.resource.id }}
                        </h3>
                    </div>
                    <div class="p-3 col-xl-6 m-auto small">
                        <div class="mt-2 p-3 border shadow-lg">
                            <div v-for="(line, key) in selectedResource.resource" :key="key" class="text-start">
                                <node-tree :name="key" :node="line"></node-tree>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container text-center">
            <div class="row py-3">
                <div v-if="! this.patient">Loading...</div>
                <div v-else class="p-3 border shadow-lg"><h3>{{ patientName }} ({{ patientAge }})</h3></div>
                <div class="p-3 col-xl-8 m-auto">
                    <div class="d-flex flex-wrap justify-content-center align-items-center">
                        <div v-for="(resourceType, index) in resourceTypes" :key="index">
                            <a href="" class="text-black" @click.prevent="expandResourceType(resourceType)">
                                <div class="m-2 p-4 border rounded-3 shadow-lg"><b>{{ resourceType }}</b></div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>