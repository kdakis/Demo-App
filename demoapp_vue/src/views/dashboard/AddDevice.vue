<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Add Device</h1>
            </div>

            <div class="column is-12">
                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Name</label>
                        <div class="control">
                            <input type="text" class="input" v-model="name">
                        </div>
                    </div>

                    <div class="field">
                        <label>Serial Number</label>
                        <div class="control">
                            <input type="text" class="input" v-model="serial_no">
                        </div>
                    </div>

                    <div class="field">
                        <label>IP Address</label>
                        <div class="control">
                            <input type="text" class="input" v-model="ip">
                        </div>
                    </div>

                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>

                    <div class="field">
                        <div class="control">
                            <button class="button is-success">Submit</button>
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
        name: 'AddDevice',
        data() {
            return {
                name: '',
                serial_no: '',
                ip: '',
                errors: []
            }
        },
        methods: {
            async submitForm() {
                    const device = {
                        name: this.name,
                        serial_no: this.serial_no,
                        ip: this.ip,
                    }

                await axios
                    .post('/api/v1/devices/', device)
                    .then(response => {
                        toast({
                            message: 'The Device was added',
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right',
                        })

                        this.$router.push('/dashboard/devices')
                    })
                    .catch(error => {
                        if (error.response) {
                            for (const property in error.response.data) {
                                this.errors.push(`${property}: ${error.response.data[property]}`)
                            }
                        } else if (error.message) {
                            this.errors.push('Something went wrong. Please try again!')
                        }
                    })

                this.$store.commit('setIsLoading', false)
                
            }
        }
    }
</script>