// Saves options to chrome.storage.sync.
function save_options() {
  chrome.storage.sync.set({
    first_view: document.getElementById('first_view').value,
    enterprise: document.getElementById('enterprise').value,
    debug: document.getElementById('debug').checked
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function clear_cache() {
  chrome.storage.local.clear();
  var status = document.getElementById('cache_status');
  status.textContent = 'Cache emptied.';
  setTimeout(function() {
    status.textContent = '';
  }, 750);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    first_view: 'im',
    enterprise: '',
    debug: false
  }, function(items) {
    document.getElementById('first_view').value = items.first_view;
    document.getElementById('enterprise').value = items.enterprise;
    document.getElementById('debug').value = items.debug;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('clear_cache').addEventListener('click', clear_cache);
