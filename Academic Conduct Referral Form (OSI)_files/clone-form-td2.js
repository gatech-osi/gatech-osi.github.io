/*
 Author: Tristan Denyer (based on Charlie Griefer's original clone code, and some great help from Dan - see his comments in blog post)
 Plugin repo: https://github.com/tristandenyer/Clone-section-of-form-using-jQuery
 Demo at http://tristandenyer.com/using-jquery-to-duplicate-a-section-of-a-form-maintaining-accessibility/
 Ver: 0.9.5.0
 Last updated: Oct 23, 2015
 Modified extensively by Aaron and Candice

 The MIT License (MIT)

 Copyright (c) 2011 Tristan Denyer

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
$(function () {

    $('#btnAdd').on('click', function(e){
        if (e.which === 13 || e.type === 'click') {  // Checks to see if user hit enter key or clicked mouse
            var num = $('.clonedInput').length; // Checks to see how many "duplicatable" input fields we currently have
                num = num - 1; // adjusts for the fact that our iterator begins at 0 -chh
                newNum = new Number(num + 1);      // The numeric ID of the new input field being added, increasing by 1 each time
                newNumLegend = new Number(newNum + 1);      // Because we start couting our people with 0, the legend needs to be increased by 1 so that it makes sense to end users
                newElem = $('#personrow' + num).clone().attr('id', 'personrow' + newNum).fadeIn('slow'); // create the new element via clone(), and manipulate it's ID using newNum value

            /*  This is where we manipulate the name/id values of the input inside the new, cloned element
             Below are examples of what forms elements you can clone, but not the only ones.
             There are 2 basic structures below: one for an H2, and one for form elements.
             To make more, you can copy the one for form elements and simply update the classes for its label and input.
             Keep in mind that the .val() method is what clears the element when it gets cloned. Radio and checkboxes need .val([]) instead of .val('').
             */

            // Legend
            newElem.find('.legend_person').html('Involved party ' + newNumLegend);

            // Name - input
            newElem.find('.label_person').attr('for', 'person_' + newNum);
            newElem.find('.input_person').attr('id', 'person_' + newNum).attr('name', 'person[]').val('');

            // Gender - select
            newElem.find('.label_gender').attr('for', 'gender_' + newNum);
            newElem.find('.select_gender').attr('id', 'gender_' + newNum).attr('name', 'gender[]').val('');

            // Role - select
            newElem.find('.label_role').attr('for', 'role_' + newNum);
            newElem.find('.select_role').attr('id', 'role_' + newNum).attr('name', 'role[]').val('');

            // SID - input
            newElem.find('.label_sid').attr('for', 'sid_' + newNum);
            newElem.find('.input_sid').attr('id', 'sid_' + newNum).attr('name', 'sid[]').val('');

            // DOB - input
            newElem.find('.label_dob').attr('for', 'dob_' + newNum);
            newElem.find('.input_dob').attr('id', 'dob_' + newNum).attr('name', 'dob[]').val('');

            // Phone - input
            newElem.find('.label_phone').attr('for', 'phone_' + newNum);
            newElem.find('.input_phone').attr('id', 'phone_' + newNum).attr('name', 'phone[]').val('');

            // Email - input
            newElem.find('.label_email').attr('for', 'email_' + newNum);
            newElem.find('.input_email').attr('id', 'email_' + newNum).attr('name', 'email[]').val('');

            // Hall Address - input
            newElem.find('.label_halladdress').attr('for', 'halladdress_' + newNum);
            newElem.find('.input_halladdress').attr('id', 'halladdress_' + newNum).attr('name', 'halladdress[]').val('');

            // PeopleFinder icon - increments its id, and adjusts the JS onclick call to reflect this personrow's number
            newElem.find('.peopleFinderIcon').attr('id', 'peopleFinderIcon_' + newNum);
            var onclickstring = "$('#callingrow').val("+newNum+");";
            newElem.find('.peopleFinderIcon').attr('onclick', onclickstring);

            // Insert the new element after the last "duplicatable" input field
            $('#personrow' + num).after(newElem);
            $('#person_' + newNum).focus();

            // Enable the "remove" button. This only shows once you have a duplicated section.
            $('#btnDel').removeClass('hide');

            // Right now you can only add 98 sections, for a total of 99. Change '99' below to the max number of sections you want to allow.
            if (newNum >= 98)  // we start at 0 so this needs to be 98.
                $('#btnAdd').attr('disabled', true).prop('value', "You've reached the limit"); // value here updates the text in the 'add' button when the limit is reached
        }
    });

    $('#btnDel').on('click', function(e){
        if (e.which === 13 || e.type === 'click') {  // Checks to see if user hit enter key or clicked mouse
            // Confirmation dialog box. Works on all desktop browsers and iPhone.
            // if (confirm("Are you sure you wish to remove this section? This cannot be undone."))
                // how many "duplicatable" input fields we currently have
                var totalrows = $('.clonedInput').length;
                num = totalrows - 1; // adjusts for the fact that our iterator begins at 0 -chh
                $('#personrow' + num).slideUp('fast', function () {
                    $(this).remove();
                    // if only one element remains, disable the "remove" button
                    if (num - 1 === 0) { //formerly 1
                        $('#btnDel').addClass('hide');
                        $('#btnAdd').focus();
                    }
                    // enable the "add" button
                    if (totalrows < 99)
                        $('#btnAdd').attr('disabled', false).prop('value', "Add another party");
                });
            return false; // Removes the last section you added
        }
    });
    // Enable the "add" button
    $('#btnAdd').attr('disabled', false);
    // Disable the "remove" button
    if ($('.clonedInput').length == 1)
        $('#btnDel').addClass('hide');
    else
        $('#btnDel').removeClass('hide');
});
