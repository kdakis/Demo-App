<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Devices</h1>

                <router-link to="/dashboard/devices/add">Add Device</router-link>
            </div>

            <div class="column is-12">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Serial Number</th>
                            <th>Published Date</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            v-for="device in devices"
                            v-bind:key="device.id">
                                <td>{{ device.id }}</td>
                                <td>{{ device.name }}</td>
                                <td>{{ device.serial_no }}</td>
                                <td>{{ device.ip }}</td>
                                <td>{{ device.published }}</td>

                                <td>
                                    <router-link :to="{ name: 'Device', params: { id: device.id }}">Details</router-link>
                                </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Devices',
        data() {
            return {
                devices: []
            }
        },
        mounted() {
            this.getDevices()
        },
        methods: {
            async getDevices() {
                this.$store.commit('setIsLoading', true)

                axios
                    .get('/api/v1/devices/')
                    .then(response => {
                        this.devices = response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })

                this.$store.commit('setIsLoading', false)
            }
        }
    }
</script>