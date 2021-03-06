import Vue from 'vue';

var EventHandlerConstant = {
    REMOVE_CONTROL: 'remove_control',

    EXPORT_FORM: 'export_form',
    PUBLISH_FORM: 'publish_form',
    SAVE_PREVIEW: 'save_preview',
    ERROR: 'error_occurred',
    // sidebar
    ACTIVATE_EDITOR_SIDEBAR: 'activate_editor_sidebar',
    ON_APPLY_EDITOR_SIDEBAR: 'on_apply_editor_sidebar',
};

// to receive event and pass...
const eventBus = new Vue();

export {
    EventHandlerConstant,
    eventBus
}
