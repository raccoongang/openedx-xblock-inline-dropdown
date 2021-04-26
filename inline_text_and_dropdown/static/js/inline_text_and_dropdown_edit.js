/* Javascript for Inline Text and Dropdown XBlock. */
function InlineTextAndDropdownXBlockInitEdit(runtime, element) {
    var xmlEditorTextarea = $('.block-xml-editor', element),
        xmlEditor = CodeMirror.fromTextArea(xmlEditorTextarea[0], {mode: 'xml', lineWrapping: true});

    $(element).find('.action-cancel').bind('click', function() {
        runtime.notify('cancel', {});
    });

    $(element).find('.action-save').bind('click', function() {
        var handlerUrl = runtime.handlerUrl(element, 'studio_submit'),
            data = {
              display_name: $('#inline-text-and-dropdown-edit-display-name').val(),
              weight: $('#inline-text-and-dropdown-edit-weight').val(),
              randomize: $('#inline-text-and-dropdown-edit-randomization').val(),
              show_correctness: $('#inline-text-and-dropdown-edit-show-correctness').val(),
              show_reset_button: $('#inline-text-and-dropdown-edit-show-reset-button').val(),
              data: xmlEditor.getValue()
            };

        runtime.notify('save', {state: 'start'});

        $.post(handlerUrl, JSON.stringify(data)).done(function(response) {
            if (response.result === 'success') {
                runtime.notify('save', {state: 'end'});
                // Reload the page
                // window.location.reload(false);
            } else {
                runtime.notify('error', {msg: response.message});
            }
        });
    });
}
