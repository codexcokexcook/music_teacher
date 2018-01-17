export function checkboxes_recall(checkbox_tag) {
  if (checkbox_tag) {
    for (i=0; i < checkbox_tag.length; i++) {
        console.log($('input[type=checkbox][value="'+checkbox_tag[i]+'"]').prop('checked',true));
        $('input[type=checkbox][value="'+checkbox_tag[i]+'"]').prop('checked',true)
    }
  }
}
