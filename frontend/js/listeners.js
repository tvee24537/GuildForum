
  document.addEvenetListener('DOMContentLoaded', function(e) {
    IdeaList.all();
  })

  document.addEventListener('click', function(e) {
    let target = e.target; 
    if (target.matches(".selectIdeaList")) {
      let ideaList = IdeaList.findById(target.dataset.ideaListId) //find idea with selected Id and show it
      ideaList.show()
    }
  })

  document.addEventListener('submit', function(e) {
    let target = e.target; 
    if(target.matches('#newIdeaList')) {
        e.preventDefault();
        let formData = {}
        target.querySelectorAll('input').forEach(function(input) {
          formData[input.name] = input.value
        })
        IdeaList.create(formData)
        } else if (target.matches('#newCommentForm')) {
            e.preventDefault();
            let formData = {};
            target.querySelectorAll('input').forEach(function(input) {
              formData[input.name] = input.value;
            });
            Comment.create(formData);
        }
  })        