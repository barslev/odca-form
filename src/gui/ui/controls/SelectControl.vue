<template>
    <div>
        <div class="row" v-if="labelPosition === 'left'">
            <slot name="label"/>

            <div class="col-md-8">
                <select2-control v-if="!control.isMultiple"
                                 v-model="control.value"
                                 :disabled="this.control.readonly"
                                 :options="dataSource">
                </select2-control>
                <select2-multiple-control v-else
                                          v-model="control.value"
                                          :disabled="this.control.readonly"
                                          :options="dataSource">
                </select2-multiple-control>
            </div>

            <slot name="information"/>
        </div>
        <div class="form-group" v-else>
            <label> {{control.label}} </label>
            <span v-show="control.required"> *</span>
            <select2-control v-if="!control.isMultiple"
                             v-model="control.value"
                             :disabled="this.control.readonly"
                             :options="dataSource">
            </select2-control>
            <select2-multiple-control v-else
                                      v-model="control.value"
                                      :disabled="this.control.readonly"
                                      :options="dataSource">
            </select2-multiple-control>
        </div>
    </div>
</template>

<script>
    import {Hooks} from '@/gui/components/hook_lists';
    import { EventHandlerConstant, eventBus } from '@/template/handler/event_handler'
    import Select2Control from "@/third_party_controls/Select2Control";
    import Select2MultipleControl from "@/third_party_controls/Select2MultipleControl";

    export default {
        name: "SelectControl",
        components: {Select2MultipleControl, Select2Control},
        props:['control', 'labelPosition'],
        data: () => ({
            dataSource: [],
        }),
        created() {
            // request for ajax source
            if (this.control.isAjax) {
                let self = this;
                $.getJSON(this.control.ajaxDataUrl)
                    .done(data => {
                        if (_.isArray(data)) {
                            self.dataSource = data;
                        } else {
                            eventBus.$emit(
                              EventHandlerConstant.ERROR,
                              `Control data error: ${this.control.label}.`
                            )
                            console.error(`Data for select control of ${this.control.label} is wrong format!`);
                        }
                    })
                    .fail(err => {
                        eventBus.$emit(
                          EventHandlerConstant.ERROR,
                          `Failed to load data for control: ${this.control.label}.`
                        )
                        console.error("Request for Select Data Source Failed: ", err);
                    });
            } else {
                this.dataSource = this.control.dataOptions;
            }
        },
        mounted() {
            if (!_.isEmpty(this.control.defaultValue)) {
                if (this.control.isMultiple) {
                    this.control.value = [this.control.defaultValue];
                } else {
                    this.control.value = this.control.defaultValue;
                }
            }

            // after hook
            Hooks.Control.afterInit.run(this.control, $(this.$el).find("select.form-control"));
        }
    }
</script>

<style scoped>

</style>
