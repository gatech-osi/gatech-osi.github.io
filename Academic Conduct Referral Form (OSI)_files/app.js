$(document).foundation();

/* Makes Abide work with checkboxes */
/*el : The jQuery element to validate. required : Boolean value of the required attribute be present or not. parent : The direct parent of the input.*/
Foundation.Abide.defaults['validators']['checkbox_limit'] =
    function ($el, $required, parent) {
        var group = parent.closest('.checkbox-group');
        var min = group.attr('data-validator-min');
        var checked = group.find(':checked').length;
        if (($required == false) || (checked >= min)) {
            // clear label highlight
            group.find('label').each(function() {
                $(this).removeClass('is-invalid-label');
            });
            // clear legend highlight
            group.find("legend").removeClass("is-invalid-label");
            // clear checkbox error
            group.find(':checkbox').each(function() {
                $(this).removeClass('is-invalid-input').removeAttr('data-invalid');
            });
            group.find('span.form-error').removeClass("is-visible");
            return true;
        } else {
            group.find('span.form-error').addClass("is-visible");
            // add label highlight to all checkboxes in group
            group.find('label').each(function() {
                $(this).addClass('is-invalid-label');
            });
            // add legend highlight
            group.find("legend").addClass("is-invalid-label");
            return false;
        }
    };
