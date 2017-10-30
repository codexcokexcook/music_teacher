export function checkboxes_recall(checkbox_tag) {
  if (checkbox_tag) {
    for (i=0; i < checkbox_tag.length; i++) {
      $('input[type=checkbox][value="'+checkbox_tag[i]+'"]').prop('checked',true);
    }
  }
}
