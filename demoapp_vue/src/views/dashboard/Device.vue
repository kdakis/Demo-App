<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">{{ device.name }}</h1>

                <router-link :to="{ name: 'EditDevice', params: { id: device.id }}" class="button is-light">Edit</router-link>
            </div>

            <div class="column is-6">
                <div class="box">
                    <h2 class="subtitle">Details</h2>

                    <p><strong>Name: </strong>{{ device.name }}</p>
                    <p><strong>Serial Number </strong>{{ device.serial_no }}</p>
                    <p><strong>IP Address </strong>{{ device.ip }}</p>
                    <p><strong>Published Date </strong>{{ device.Published }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Device',
        data() {
            return {
                device: {}
            }
        },
        mounted() {
            this.getDevice()
        },
        methods: {
            async getDevice() {
                this.$store.commit('setIsLoading', true)

                const deviceID = this.$route.params.id

                axios
                    .get(`/api/v1/devices/${deviceID}/`)
                    .then(response => {
                        this.device = response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })

                this.$store.commit('setIsLoading', false)
            }
        }
    }
</script>