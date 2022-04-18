<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Edit {{ device.name }}</h1>
            </div>

            <div class="column is-12">
                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Name</label>
                        <div class="control">
                            <input type="text" class="input" v-model="device.name">
                        </div>
                    </div>

                    <div class="field">
                        <label>Serial Number</label>
                        <div class="control">
                            <input type="text" class="input" v-model="device.serial_no">
                        </div>
                    </div>

                    <div class="field">
                        <label>IP Adress</label>
                        <div class="control">
                            <input type="email" class="input" v-model="device.ip">
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <button class="button is-success">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    import { toast } from 'bulma-toast'

    export default {
        name: 'EditDevice',
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
            },
            async submitForm() {
                this.$store.commit('setIsLoading', true)

                const deviceID = this.$route.params.id

                axios
                    .patch(`/api/v1/devices/${deviceID}/`, this.device)
                    .then(response => {
                        toast({
                            message: 'The lead was updated',
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right',
                        })

                        this.$router.push(`/dashboard/devices/${deviceID}`)
                    })
                    .catch(error => {
                        console.log(error)
                    })

                this.$store.commit('setIsLoading', false)
            }
        }
    }
</script>