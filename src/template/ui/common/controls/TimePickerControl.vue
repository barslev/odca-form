<template>
    <div class="controlItemWrapper" :class="control.className" :data-control-name="control.name">
        <div class="controlItem row" :id="control.name" v-if="labelPosition === 'left'">
            <slot name="label"/>

            <div :class="inputClass" class="input-group">
                <input type="text" class="form-control"
                       :readonly="control.readonly"
                       :name="control.fieldName">

                <div class="input-group-append">
                        <span class="input-group-text">
                            <font-awesome-icon :icon="icon"></font-awesome-icon>
                        </span>
                </div>
            </div>

            <slot name="options"/>
            <slot name="information"/>
        </div>
        <div class="controlItem row" :id="control.name" v-else>
            <div class="form-group col-md-12">
                <label> {{control.label}} </label>
                <span v-show="control.required"> *</span>
                <div class="input-group">
                    <input type="text" class="form-control"
                           :readonly="control.readonly"
                           :name="control.fieldName">

                    <div class="input-group-append">
                        <span class="input-group-text">
                            <font-awesome-icon :icon="icon"></font-awesome-icon>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {CONTROL_TYPES} from "@/config/control_constant";
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

    export default {
        name: "TimePickerControl",
        props: ['control', 'labelPosition', 'inputClass'],
        components: {FontAwesomeIcon},
        data: () => ({
            $control: null,
            icon: CONTROL_TYPES.timepicker.icon
        }),
        watch: {
            "control.defaultValue": function(val) {
                if (!this.$control) {
                    return;
                }

                this.$control.val(val);
            }
        },
        methods: {
            configUpdated() {
                this.$control.data('TimePicker').options.timeFormat = this.control.timeFormat;
            }
        },
        mounted() {
            let self = this;
            this.$control = $(this.$el).find("input");
            this.$control.timepicker({
                timeFormat: this.control.timeFormat
            });
        },
        beforeDestroy() {
            this.$control.timepicker('destroy');
        }
    }
</script>

<style scoped>

</style>
