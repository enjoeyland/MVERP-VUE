<template>
    <div v-if="description" class="alert">
        <a-alert :message="message" :type="type" :description="description" showIcon closable />
    </div>
</template>

<script>
    export default {
        name: "Alert",
        props: {
            type: {
                validator: function (value) {
                    return ['success', 'info', 'warning', 'error'].indexOf(value) !== -1
                },
            },
            message: String,
            description: String
        },

        methods: {
            alert(type, description) {
                this.type = type;
                this.description = description;

                if (this.type === 'success') {
                    this.message = 'Success Tips';
                }
                if (this.type === 'info') {
                    this.message = 'Informational Notes';
                }
                if (this.type === 'warning') {
                    this.message = 'Warning';
                }
                if (this.type === 'error') {
                    this.message = 'Error';
                }
            }
        }
    }

</script>

<style scoped>
    .alert {
        position: fixed;
        top: 50%;
        width: 50%;
        left: 50%;
        z-index: 99999;
        transform: translate(-50%, -50%);
    }
</style>