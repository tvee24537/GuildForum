document.addEventListener('click', function(e) {
    console.dir(e.target)
  })

  document.addEvenetListener('DOMContentLoaded', function(e) {
    IdeaList.all();
  })