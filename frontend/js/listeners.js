
  document.addEvenetListener('DOMContentLoaded', function(e) {
    IdeaList.all();
  })

  document.addEventListener('click', function(e) {
    console.dir(e.target)
    let target = e.target; 
    if (target.matches('.editIdeaList')) {
      let list = IdeaList.findById(target.dataset.ideaListId);
      list.edit();
    }
  })

  document.addEventListener('submit', function(e) {
    let target = e.target; 
    if(target.matches('#newIdeaList')) {
        e.preventDefault();
        let nameInput = target.querySelector('input[name="name"]');
        let formData = {
            name: nameInput.value
        };
        IdeaList.create({idea_list: formData})
            .then(() => nameInput.value = "");
        } else if (target.matches('.editIdeaListForm')) {
            e.preventDefault();
            let nameInput = target.querySelector('input[name="name"]');
            let formData = {
              name: nameInput.value
            };
            let list = IdeaList.findById(target.dataset.ideaListId);
            list.update({idea_list: formData});
        }
  })        